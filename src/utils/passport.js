const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../daos/UserMongo')
const logger = require('./logger')

const UsersDb = new User()
const users = async () => {
  const aUser = await UsersDb.getAll()
  return aUser
}
let allUsersExternal

passport.use('register', new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPass',
    passReqToCallback: true
  },
  async (req, userEmail, userPass, done) => {
    const allUsers = await UsersDb.getAll()
    const existance = allUsers.find(user => user._id === userEmail)
    if (existance) return logger.warn(`Intento de creación de usuario con email ya existente ${'<' + userEmail + '>'}`)
    if (existance) return done(new Error('Ya Existe'))
    const passHasheado = bcrypt.hashSync(userPass, bcrypt.genSaltSync(10))
    const newUser = {
      name: req.body.userName,
      address: req.body.userAddress,
      age: req.body.userAge,
      email: req.body.userEmail,
      phone: req.body.userPhone,
      pass: passHasheado
    }
    req.newUser = newUser
    done(null, newUser)
}))

passport.use('auth', new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPass',
  },
  async (userEmail, userPass, done) => {
    const allUsers = await UsersDb.getAll()
    const user = allUsers.find(user => user._id === userEmail)
    if (!user || !bcrypt.compareSync(userPass, user.pass)) return logger.warn(`Email inexistente o pass incorrecta`)
    if (!user || !bcrypt.compareSync(userPass, user.pass)) return done(new Error('Email inexistente o pass incorrecta'))
    done(null, user)
}))

passport.serializeUser((user, callback) => {
  callback(null, {_id: user._id, cartId: user.cartId})
})

passport.deserializeUser(async (user, callback) => {
  users()
    .then(response => {
      console.log("RES", response)
      const foundUser = response.find(entry => entry._id === user._id)
      callback(null, {_id: foundUser._id, cartId: foundUser.cartId})
    })
    .catch(error => logger.error(error))
})

module.exports = passport;
