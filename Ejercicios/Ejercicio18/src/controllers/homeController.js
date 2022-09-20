const moment = require('moment');
const logger = require('../utils/logger')

const ProductsRepository = require('../db/Repositories/ProductRepository')
const products = new ProductsRepository()

const MessagessRepository = require('../db/Repositories/MessageRepository')
const messages = new MessagessRepository()

const fetchProducts = async () => {
  try {
    return await products.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const saveNewProduct = async (newProduct) => {
  try {
    await products.save(newProduct);
  } catch (error) {
    logger.error(error)
  }
}

const fetchMessages = async () => {
  try {
    const fetchedmessages = await messages.getAll();
    const orderedMessages = fetchedmessages.sort((a, b) => {
      return a.rawDate - b.rawDate
    })
    return orderedMessages;
  } catch (error) {
    logger.error({error})
  }
}

const saveNewMessage = async (newMessage) => {
  newMessage.rawDate = new Date().valueOf()
  newMessage.date = moment().format('DD/MM/YYYY, HH:MM:SS');
  try {
    await messages.save(newMessage);
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchProducts, fetchMessages, saveNewProduct, saveNewMessage}