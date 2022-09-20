class MessagesDto {
  constructor (message) {
    this.author = {
      age: message.author.age,
      alias: message.author.alias,
      avatar: message.author.avatar,
      email: message.author.email,
      lastname: message.author.lastname,
      name: message.author.name,
    }
    this.date = message.date
    this.rawDate = message.rawDate
    this.text = message.text
  }
}

module.exports = MessagesDto