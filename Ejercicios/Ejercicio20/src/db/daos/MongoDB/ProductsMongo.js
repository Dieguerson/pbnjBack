const ContenedorMongo = require('./ContenedorMongo')
const productSchema = require('../../../models/Products')

class ProductsMongo extends ContenedorMongo {
  static instance
  constructor() {
    super('productsProductronica', productSchema)
  }

  static getInstance() {
    if (!ProductsMongo.instance) {
      ProductsMongo.instance = new ProductsMongo()
    }

    return ProductsMongo.instance
  }
}

module.exports = ProductsMongo