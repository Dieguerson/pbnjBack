const ContenedorFirebase = require('./ContenedorDBFirebase')

class ProductsFirebase extends ContenedorFirebase {
  static instance
  constructor() {
    super('productsProductronica')
  }

  static getInstance() {
    if (!ProductsFirebase.instance) {
      ProductsFirebase.instance = new ProductsFirebase()
    }

    return ProductsFirebase.instance
  }
}

module.exports = ProductsFirebase