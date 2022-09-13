const moment = require('moment');
const logger = require('../utils/logger')

// const Contenedor = require('../db/ContenedorDB');
// const productsDb = new Contenedor('products')

// const ContenedorFirebase = require('../db/ContenedorDBFirebase');
// const messageDb = new ContenedorFirebase('messages')

const ProductsFirebase = require('../db/daos/Firebase/ProductsFirebase')
const productsDb = new ProductsFirebase()

const MessagesFirebase = require('../db/daos/Firebase/MessagesFirebase')
const messageDb = new MessagesFirebase()

const fetchProducts = async () => {
  try {
    return await productsDb.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const saveNewProduct = async (newProduct) => {
  try {
    await productsDb.save(newProduct);
  } catch (error) {
    logger.error({error})
  }
}

const fetchMessages = async () => {
  try {
    const messages = await messageDb.getAll();
    const orderedMessages = messages.sort((a, b) => {
      return a.result - b.result
    })
    return orderedMessages;
  } catch (error) {
    logger.error({error})
  }
}

const saveNewMessage = async (newMessage) => {
  newMessage.date = moment().format('DD/MM/YYYY, HH:MM:SS');
  try {
    await messageDb.save(newMessage);
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchProducts, fetchMessages, saveNewProduct, saveNewMessage}