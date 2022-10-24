class UsersDto {
  constructor (user) {
    this.name = user.name,
    this.address = user.address,
    this.age = user.age,
    this._id = user._id,
    this.phone = user.phone,
    this.pass = user.pass,
    this.cartId = user.cartId,
    this.avatarURL = user.avatarURL
    this.admin = user.admin
  }
}

module.exports = UsersDto