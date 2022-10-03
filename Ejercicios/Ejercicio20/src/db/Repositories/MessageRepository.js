const MessagesDto = require('../dtos/MessagesDto')
const chosenDb = require('../dbSelector')


class MessageRepository {
  constructor() {
    this.dao = chosenDb.getDao('messages')
  }

  async getAll() {
    const messages = await this.dao.getAll()
    const plainedMessages = messages.map(message => {
      return new MessagesDto(message)
    })
    return plainedMessages;
  }

  async save(message) {
    const plainMessage = new MessagesDto(message)
    await this.dao.save(plainMessage);
  }
}

module.exports = MessageRepository