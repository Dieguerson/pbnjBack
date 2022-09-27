const moment = require('moment');
const logger = require('../../utils/logger')

const MessagesRepository = require('../../db/Repositories/MessageRepository')
const messages = new MessagesRepository()

const createMessage = async ({data}) => {
  const { 
    author_age,
    author_alias,
    author_avatar,
    author_email,
    author_lastname,
    author_name,
    text 
  } = data
  const newMessage = {
    author: {
      age :author_age,
      alias: author_alias,
      avatar: author_avatar,
      email: author_email,
      lastname: author_lastname,
      name: author_name
    },
    date: moment().format('DD/MM/YYYY, HH:MM:SS'),
    rawDate: new Date().valueOf(),
    text
  }
  try {
    await messages.save(newMessage);
    return newMessage
  } catch (error) {
    logger.error(error)
  }
}

const getMessages = async () => {
  try {
    const fetchedMessages = await messages.getAll();
    const formattedMessages = fetchedMessages.map(message => {
      const {
        age: author_age,
        alias: author_alias,
        avatar: author_avatar,
        email: author_email,
        lastname: author_lastname,
        name: author_name,
      } = message.author
      return {
        author_age,
        author_alias,
        author_avatar,
        author_email,
        author_lastname,
        author_name,
        date: message.date,
        rawDate: message.rawDate,
        text: message.text 
      }
    })
    return formattedMessages
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { createMessage, getMessages }