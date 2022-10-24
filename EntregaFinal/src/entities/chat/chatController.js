const logger = require('../../utils/logger')

const ChatRepository = require('./ChatRepository')
const chat = new ChatRepository()

const fetchMessages = async () => {
  try {
    return await chat.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const fetchMessageById = async (messageId) => {
  try {
    return await chat.getById(messageId);
  } catch (error) {
    logger.error({error})
  }
}

const fetchMessagesByEmail = async (email) => {
  try {
    const chat = await fetchMessages()
    const messagesByEmail = chat.filter(message => message.email === email)
    return messagesByEmail;
  } catch (error) {
    logger.error({error})
  }
}

const saveNewMessage = async (newMessage) => {
  try {
    const id = await chat.save(newMessage)
    return id;
  } catch (error) {
    logger.error(error)
  }
}

const modifyMessage = async (messageId, message) => {
  try {
    await chat.modify(messageId, message);
  } catch (error) {
    logger.error(error)
  }
}

const deleteMessage = async (messageId) => {
  try {
    await chat.deleteById(messageId);
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { fetchMessages, fetchMessageById, fetchMessagesByEmail, saveNewMessage, deleteMessage, modifyMessage }