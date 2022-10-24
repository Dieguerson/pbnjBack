const {Schema} = require("mongoose")

const prodSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  code:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
},
{
  timestamps: true
})

module.exports = prodSchema