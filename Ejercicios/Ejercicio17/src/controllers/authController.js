const logger = require('../utils/logger')
const UsersRepository = require('../db/Repositories/UserRepository')
const users = new UsersRepository()

const fetchUsers = async () => {
  try {
    const test = await users.getAll()
    return test
  } catch (error) {
    logger.error({error})
  }
}

const saveNewUser = async (newUser) => {
  try {
    await users.save(newUser)
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchUsers, saveNewUser }