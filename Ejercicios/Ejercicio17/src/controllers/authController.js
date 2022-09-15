const UsersDto = require('../db/dtos/UsersDto')
const FirebaseDaoFactory = require('../db/daos/Firebase/FirebaseDaoFactory')
const FireFactory = new FirebaseDaoFactory()
const userDb = FireFactory.getDao('users')

const fetchUsers = async () => {
  try {
    return await userDb.getAll()
  } catch (error) {
    logger.error({error})
  }
}

const saveNewUser = async (newUser) => {
  const plainUser = new UsersDto(newUser)
  try {
    await userDb.save(plainUser)
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchUsers, saveNewUser }