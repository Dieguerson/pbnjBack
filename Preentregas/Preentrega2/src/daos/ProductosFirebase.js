const ContenedorFirebase = require('../Contenedor/ContenedorFirebase')

class ProductosFirebase extends ContenedorFirebase {
  constructor() {
    super('products')
  }
}

module.exports = ProductosFirebase