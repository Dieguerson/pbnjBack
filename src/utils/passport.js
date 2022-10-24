const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcrypt')

const { fetchUsers } = require('../entities/user/userController')

const logger = require('./logger')

let allUsers

const populateAll = async () => {
  allUsers = await fetchUsers()
}

populateAll()

passport.use('register', new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPass',
    passReqToCallback: true
  },
  async (req, userEmail, userPass, done) => {
    await populateAll()
    const existance = allUsers.find(user => user._id === userEmail)
    if (existance) return logger.warn(`Intento de creación de usuario con email ya existente ${'<' + userEmail + '>'}`)
    if (existance) return done(new Error('Ya Existe'))
    const passHasheado = bcrypt.hashSync(userPass, bcrypt.genSaltSync(10))
    const newUser = {
      name: req.body.userName,
      address: req.body.userAddress,
      age: req.body.userAge,
      _id: req.body.userEmail,
      phone: req.body.userPhone,
      pass: passHasheado,
      admin: req.body.admin === 'admin' ? true : false
    }
    req.newUser = newUser
    done(null, newUser)
}))

passport.use('login', new LocalStrategy(
  {
    usernameField: 'userLogEmail',
    passwordField: 'userLogPass',
    passReqToCallback: true
  },
  async (req, userLogEmail, userLogPass, done) => {
    await populateAll()
    const user = allUsers.find(user => user._id === userLogEmail)
    if (!user || !bcrypt.compareSync(userLogPass, user.pass)) return logger.warn(`Email inexistente o pass incorrecta`)
    if (!user || !bcrypt.compareSync(userLogPass, user.pass)) return done(new Error('Email inexistente o pass incorrecta'))
    req.user = user
    done(null, user)
}))

const JWTExtractor = (req) => {
  const { jwt } = req.cookies
  if (req.cookies.jwt) return jwt
  if (!req.cookies?.jwt) {
    return new Error('Sin Autorización')
  }
}

passport.use('auth', new JWTStrategy(
    {
      secretOrKey: 'Diega',
      jwtFromRequest: JWTExtractor
    },
    (token, done) => {
      if (token) {
        return done(null, token.payload);
      } else {
        logger.warn(`Email inexistente o pass incorrecta`)
        done(new Error('Email inexistente o pass incorrecta'))
      }
    }
  )
);

module.exports = {
  passport: passport,
  populateAll: populateAll
};