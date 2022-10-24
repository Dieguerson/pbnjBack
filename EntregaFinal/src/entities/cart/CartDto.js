class CartDto {
  constructor (cart) {
    this._id = cart._id || undefined
    this.email = cart.email
    this.products = cart.products
    this.address = cart.address
  }
}

module.exports = CartDto