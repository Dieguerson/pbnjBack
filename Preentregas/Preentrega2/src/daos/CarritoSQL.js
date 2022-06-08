const ContenedorMySQL = require('../Contenedor/ContenedorMySQL')

class CarritoSQL extends ContenedorMySQL {
  constructor() {
    super('carrito')
  }
}

module.exports = CarritoSQL