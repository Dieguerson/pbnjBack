const {Schema} = require("mongoose")

const cartSchema = new Schema ({
  email: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  address: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

module.exports = cartSchema