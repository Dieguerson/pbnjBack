const logger = require('../../utils/logger')

const UsersRepository = require('../../db/Repositories/UserRepository')
const users = new UsersRepository()

const createUser = async ({data}) => {
  const { email, password } = data
  const newUser = {
    email,
    password
  }
  try {
    await users.save(newUser);
    return newUser
  } catch (error) {
    logger.error(error)
  }
}

const getUsers = async () => {
  try {
    return await users.getAll();
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { getUsers, createUser }