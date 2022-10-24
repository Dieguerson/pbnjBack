const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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

passport.use('auth', new LocalStrategy(
  {
    usernameField: 'userLogEmail',
    passwordField: 'userLogPass',
  },
  async (userLogEmail, userLogPass, done) => {
    await populateAll()
    const user = allUsers.find(user => user._id === userLogEmail)
    if (!user || !bcrypt.compareSync(userLogPass, user.pass)) return logger.warn(`Email inexistente o pass incorrecta`)
    if (!user || !bcrypt.compareSync(userLogPass, user.pass)) return done(new Error('Email inexistente o pass incorrecta'))
    done(null, user)
}))

passport.serializeUser(async (user, callback) => {
  await populateAll()
  callback(null, {_id: user._id, cartId: user.cartId, admin: user.admin})
})

passport.deserializeUser(async (user, callback) => {
  await populateAll()
  const foundUser = allUsers.find(entry => entry._id === user._id)
  callback(null, {_id: foundUser?._id, cartId: foundUser?.cartId, admin: foundUser?.admin})
})

module.exports = {
  passport: passport,
  populateAll: populateAll
};