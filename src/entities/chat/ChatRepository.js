const ChatDTO = require('./ChatDto')
const chosenDb = require('../../database/dbSelector')

class ChatRepository {
  constructor() {
    this.dao = chosenDb.getDao('messages')
  }

  async getAll() {
    const messages = await this.dao.getAll()
    const plainedMessages = messages.map(message => {
      return new ChatDTO(message)
    })
    return plainedMessages;
  }

  async getById(messageId) {
    const message = await this.dao.getById(messageId)
    const plainedMessage = new ChatDTO(message)

    return plainedMessage;
  }

  async save(message) {
    const plainMessage = new ChatDTO(message)
    return await this.dao.save(plainMessage);
  }

  async modify(id, message) {
    await this.dao.modify(id, message);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }
}

module.exports = ChatRepository