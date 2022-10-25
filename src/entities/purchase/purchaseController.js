const logger = require('../../utils/logger');
const { fetchCartById } = require('../cart/cartController');
const { fetchUserById } = require('../user/userController');

const { sendMailPurchase } = require('../../utils/mailing')
const sendMessage = require('../../utils/messaging')

const PurchaseRepository = require('./PurchaseRepository')
const purchases = new PurchaseRepository()

const fetchOrders = async () => {
  try {
    return await purchases.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const fetchOrderById = async (purchaseId) => {
  try {
    return await purchases.getById(purchaseId);
  } catch (error) {
    logger.error({error})
  }
}

const fetchOrdersByEmail = async (email) => {
  try {
    const orders = await fetchOrders()
    const ordersByEmail = orders.filter(order => order.email === email)
    return ordersByEmail;
  } catch (error) {
    logger.error({error})
  }
}

const saveNewOrder = async (cartId) => {
  try {
    const orders = await fetchOrders()
    const cart = await fetchCartById(cartId)
    const newOrder = {
      products: cart.products,
      number: orders.length + 1,
      status: 'generada',
      email: cart.email
    }
    const user = await fetchUserById(cart.email)
    const id = await purchases.save(newOrder)
    sendMessage(cart, user.phone, cart.email, user.name)
    sendMailPurchase(cart, cart.email, user.name)
    return id;
  } catch (error) {
    logger.error(error)
  }
}

const modifyOrder = async (ordedrId, order) => {
  try {
    await purchases.modify(ordedrId, order);
  } catch (error) {
    logger.error(error)
  }
}

const deleteOrder = async (ordedrId) => {
  try {
    await purchases.deleteById(ordedrId);
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { fetchOrders, fetchOrderById, fetchOrdersByEmail, saveNewOrder, modifyOrder, deleteOrder }
