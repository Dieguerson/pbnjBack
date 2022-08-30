const ContenedorMongo = require('../Contenedor/ContenedorMongo')
const User = require('../models/User')

class UsuariosMongo extends ContenedorMongo {
  constructor() {
    super('users', User)
  }
}

module.exports = UsuariosMongo