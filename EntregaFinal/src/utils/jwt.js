const jwt = require('jsonwebtoken')

const test = (req, _, next) => {
  const { _id, cartId, admin } = req.user
  const payload = { _id, cartId, admin }
  const token = jwt.sign({payload}, 'Diega')
  req.token = token
  next()
}

module.exports = test