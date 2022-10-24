const CartDto = require('./CartDto')
const chosenDb = require('../../database/dbSelector')

class CartRepository {
  constructor() {
    this.dao = chosenDb.getDao('cart')
  }

  async getAll() {
    const carts = await this.dao.getAll()
    const plainedCarts = carts.map(cart => {
      return new CartDto(cart)
    })
    return plainedCarts;
  }

  async getById(cartId) {
    const cart = await this.dao.getById(cartId)
    const plainedCart = new CartDto(cart)

    return plainedCart;
  }

  async save(cart) {
    const plainCart = new CartDto(cart)
    return await this.dao.save(plainCart);
  }

  async modify(id, cart) {
    await this.dao.modify(id, cart);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }
}

module.exports = CartRepository