const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { fetchUsers } = require('../controllers/authController');

passport.use('register', new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPassword',
    passReqToCallback: true
  },
  async (req, userEmail, userPassword, done) => {
    const userList = await fetchUsers()
    const existance = userList.find(user => user.email === userEmail)
    if (existance) return done(new Error('Ya Existe'))
    const passHasheado = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10))
    const newUser = {
      email: userEmail,
      password: passHasheado
    }
    req.newUser = newUser
    done(null, newUser)
}))

passport.use('auth', new LocalStrategy(
    {
    usernameField: 'userEmail',
    passwordField: 'userPassword',
  },
  async (userEmail, userPassword, callback) => {
    const userList = await fetchUsers()
    const user = userList.find(user => user.email === userEmail)
    if (!user || !bcrypt.compareSync(userPassword, user.password)) return callback(null, false, {message: 'Error'})
    return callback(null, user)
}))

passport.serializeUser((user, callback) => {
  callback(null, user.email)
})

passport.deserializeUser(async (userEmail, done) => {
  const userList = await fetchUsers()
  const user = userList.find(user => user.email === userEmail)
  done(null, user.email)
})

module.exports = passport;