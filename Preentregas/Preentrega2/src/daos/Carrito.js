const Contenedor = require('../Contenedor/Contenedor')

class Carritos extends Contenedor {
  constructor() {
    super('carritos.txt')
  }
}

module.exports = Carritos