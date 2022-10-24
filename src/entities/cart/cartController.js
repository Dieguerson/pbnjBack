const logger = require('../../utils/logger')

const CartRepository = require('./CartRepository')
const carts = new CartRepository()

const { fetchProductById } = require('../products/productsController')

const fetchCarts = async () => {
  try {
    return await carts.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const fetchCartById = async (cartId) => {
  try {
    return await carts.getById(cartId);
  } catch (error) {
    logger.error({error})
  }
}

const saveNewCart = async (newCart) => {
  try {
    const id = await carts.save(newCart)
    return id;
  } catch (error) {
    logger.error(error)
  }
}

const modifyCart = async (cartId, cart) => {
  try {
    await carts.modify(cartId, cart);
  } catch (error) {
    logger.error(error)
  }
}

const deleteCart = async (cartId) => {
  try {
    await carts.deleteById(cartId);
  } catch (error) {
    logger.error(error)
  }
}

const addToCart = async (cartId, productId, ammount) => {
  try {
    const cart = await fetchCartById(cartId)
    const product = await fetchProductById(productId)
    const newEntry =  {
      product,
      ammount
    }
    cart.products.push(newEntry)
    await modifyCart(cartId, cart)
  } catch (error) {
    logger.error(error)
  }
}

const deleteFromCart = async (cartId, productId) => {
  try {
    const cart = await fetchCartById(cartId)
    const toDelete = cart.products.find(poke => poke._id.toString() === productId)
    const index = cart.products.indexOf(toDelete)
    cart.products.splice(index, 1)
    await modifyCart(cartId, cart)
  } catch (error) {
    logger.error(error)
  }
}

const clearCart = async (cartId) => {
  try {
    const cart = await fetchCartById(cartId)
    cart.products = []
    await modifyCart(cartId, cart)
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { fetchCarts, fetchCartById, saveNewCart, deleteCart, modifyCart, addToCart, deleteFromCart, clearCart }