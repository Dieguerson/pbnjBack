const dateFormatter = require('../../utils/dateFormatter');

class PurchaseDTO {
  constructor (order) {
    this._id = order._id || undefined
    this.products = order.products
    this.number = order.number
    this.status = order.status
    this.email = order.email
    this.date = dateFormatter(order.createdAt) ||undefined
  }
}

module.exports = PurchaseDTO