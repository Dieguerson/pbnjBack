const Contenedor = require('../Contenedor/Contenedor')

class Productos extends Contenedor {
  constructor() {
    super('productos.txt')
  }
}

module.exports = Productos