const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('./models/User')
const ContenedorMongo = require('./ContenedorMongo');
const userDb = new ContenedorMongo('users', User)

passport.use('auth', new LocalStrategy(async (username, pass, callback) => {
  const userList = await userDb.getAll()
  const user = userList.find(user => user.username === username)
  if (!user || !bcrypt.compareSync(pass, user.password)) return callback(null, false, {message: 'Error'})
  return callback(null, user)
}))

passport.serializeUser((user, callback) => {
  callback(null, user.username)
})

passport.deserializeUser(async (username, done) => {
  const userList = await userDb.getAll()
  const user = userList.find(user => user.username === username)
  done(null, user)
})

module.exports = passport;