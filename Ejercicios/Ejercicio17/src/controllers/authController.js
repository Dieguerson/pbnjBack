//const ContenedorMongo = require('../db/ContenedorMongo');
//const User = require('../models/User')
//const userDb = new ContenedorMongo('usersProductronica', User)
const UsersFirebase = require('../db/daos/Firebase/UsersFirebase')
const userDb = new UsersFirebase()

const fetchUsers = async () => {
  try {
    return await userDb.getAll()
  } catch (error) {
    logger.error({error})
  }
}

const saveNewUser = async (newUser) => {
  try {
    await userDb.save(newUser)
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchUsers, saveNewUser }