const ContenedorMongo = require('../Contenedor/ContenedorMongo')
const Cart = require('../models/Cart')

class CarritoMongo extends ContenedorMongo {
  constructor() {
    super('cart', Cart)
  }
}

module.exports = CarritoMongo