const ContenedorMySQL = require('../Contenedor/ContenedorMySQL')

class ProductosSQL extends ContenedorMySQL {
  constructor() {
    super('productos')
  }
}

module.exports = ProductosSQL