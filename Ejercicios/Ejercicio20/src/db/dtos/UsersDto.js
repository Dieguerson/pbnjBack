class UsersDto {
  constructor (user) {
    this.email = user.email
    this.password = user.password
  }
}

module.exports = UsersDto