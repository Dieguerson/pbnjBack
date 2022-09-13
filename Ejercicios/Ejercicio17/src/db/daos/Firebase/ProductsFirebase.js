const ContenedorFirebase = require('./ContenedorDBFirebase')

class ProductosFirebase extends ContenedorFirebase {
  constructor() {
    super('productsProductronica')
  }
}

module.exports = ProductosFirebase