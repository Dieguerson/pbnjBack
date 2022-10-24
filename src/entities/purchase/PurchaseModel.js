const {Schema} = require("mongoose")

const orderSchema = new Schema ({
  products: {
    type: Array,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

module.exports = orderSchema