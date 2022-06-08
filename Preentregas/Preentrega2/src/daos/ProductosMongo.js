const ContenedorMongo = require('../Contenedor/ContenedorMongo')
const Product = require('../models/Products')

class ProductosMongo extends ContenedorMongo {
  constructor() {
    super('products', Product)
  }
}

module.exports = ProductosMongo