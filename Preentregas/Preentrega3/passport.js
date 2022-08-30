const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./src/daos/UserMongo')

const users = new User()

passport.use('register', new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPass',
    passReqToCallback: true
  },
  async (req, userEmail, userPass, done) => {
    const db = await users.getAll()
    const existance = db.find(user => user._id === userEmail)
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
    const db = await users.getAll()
    const user = db.find(user => user._id === userEmail)
    if (!user || !bcrypt.compareSync(userPass, user.pass)) return done(new Error('No existe o pass incorrecta'))
    done(null, user)
}))

passport.serializeUser((user, callback) => {
  callback(null, {_id: user._id, cartId: user.cartId})
})

passport.deserializeUser(async (user, callback) => {
  const db = await users.getAll()
  const foundUser = db.find(user => user._id === user._id)
  callback(null, {_id: foundUser._id, cartId: foundUser.cartId})
})

module.exports = passport;