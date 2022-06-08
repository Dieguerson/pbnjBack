const ContenedorFirebase = require('../Contenedor/ContenedorFirebase')

class CarritoFirebase extends ContenedorFirebase {
  constructor() {
    super('cart')
  }
}

module.exports = CarritoFirebase