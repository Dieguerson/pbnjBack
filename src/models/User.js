const {Schema} = require("mongoose")

const userSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  _id:{
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  cartId: {
    type: String,
    required: true
  },
  avatarURL: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

module.exports = userSchema