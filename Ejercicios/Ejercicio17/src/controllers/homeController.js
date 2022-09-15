const moment = require('moment');
const logger = require('../utils/logger')
const ProductsDto = require('../db/dtos/ProductsDto')
const MessagesDto = require('../db/dtos/MessagesDto')
const FirebaseDaoFactory = require('../db/daos/Firebase/FirebaseDaoFactory')
const FireFactory = new FirebaseDaoFactory()

const productsDb = FireFactory.getDao('products')
const productsDb2 = FireFactory.getDao('products')

console.log('Igualdad de DBs', productsDb === productsDb2)

const messageDb = FireFactory.getDao('messages')

const fetchProducts = async () => {
  try {
    return await productsDb.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const saveNewProduct = async (newProduct) => {
  const plainProduct = new ProductsDto(newProduct)
  try {
    await productsDb.save(plainProduct);
  } catch (error) {
    logger.error(error)
  }
}

const fetchMessages = async () => {
  try {
    const messages = await messageDb.getAll();
    const orderedMessages = messages.sort((a, b) => {
      return a.innerId - b.innerId
    })
    return orderedMessages;
  } catch (error) {
    logger.error({error})
  }
}

const saveNewMessage = async (newMessage) => {
  newMessage.date = moment().format('DD/MM/YYYY, HH:MM:SS');
  const plainMessage = new MessagesDto(newMessage)
  try {
    await messageDb.save(plainMessage);
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchProducts, fetchMessages, saveNewProduct, saveNewMessage, productsDb}