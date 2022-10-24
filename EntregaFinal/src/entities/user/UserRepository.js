const UsersDto = require('./UsersDto')
const chosenDb = require('../../database/dbSelector')

class UserRepository {
  constructor() {
    this.dao = chosenDb.getDao('users')
  }

  async getAll() {
    const users = await this.dao.getAll()
    const plainedUsers = users.map(user => {
      return new UsersDto(user)
    })
    
    return plainedUsers;
  }

  async getById(id) {
    const user = await this.dao.getById(id)
    const plainUser = new UsersDto(user)

    return plainUser
  }

  async save(user) {
    const plainUser = new UsersDto(user)
    await this.dao.save(plainUser);
  }
}

module.exports = UserRepository