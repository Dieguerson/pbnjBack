const {Schema} = require("mongoose")

const chatSchema = new Schema ({
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

module.exports = chatSchema