const HandlerMongo = require('../handlers/HandlerMongo')
const Products = require('../models/Products')

class ProductsMongo extends HandlerMongo {
  constructor() {
    super('products', Products)
  }
}

module.exports = ProductsMongo