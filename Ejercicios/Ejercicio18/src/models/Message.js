const {Schema} = require("mongoose")

const messageSchema = new Schema ({
  author: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  rawDate: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

module.exports = messageSchema