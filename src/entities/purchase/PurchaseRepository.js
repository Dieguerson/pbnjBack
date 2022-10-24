const PurchaseDTO = require('./PurchaseDto')
const chosenDb = require('../../database/dbSelector')

class PurchaseRepository {
  constructor() {
    this.dao = chosenDb.getDao('orders')
  }

  async getAll() {
    const orders = await this.dao.getAll()
    const plainedOrders = orders.map(order => {
      return new PurchaseDTO(order)
    })
    return plainedOrders;
  }

  async getById(orderId) {
    const order = await this.dao.getById(orderId)
    const plainedOrder = new PurchaseDTO(order)

    return plainedOrder;
  }

  async save(order) {
    const plainOrder = new PurchaseDTO(order)
    return await this.dao.save(plainOrder);
  }

  async modify(id, order) {
    await this.dao.modify(id, order);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }
}

module.exports = PurchaseRepository