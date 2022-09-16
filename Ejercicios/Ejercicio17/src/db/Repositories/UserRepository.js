const UsersDto = require('../dtos/UsersDto')
const chosenDb = require('../dbSelector')

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

  async save(user) {
    const plainUser = new UsersDto(user)
    await this.dao.save(plainUser);
  }
}

module.exports = UserRepository