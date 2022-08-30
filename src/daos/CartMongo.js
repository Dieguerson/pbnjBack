const HandlerMongo = require('../handlers/HandlerMongo')
const Cart = require('../models/Cart')

class CartMongo extends HandlerMongo {
  constructor() {
    super('cart', Cart)
  }
}

module.exports = CartMongo