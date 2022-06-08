const {Schema} = require("mongoose")

const cartSchema = new Schema ({
  message: {
    type: String,
    required: true,
  },
  products:{
    type: Array,
    required: true
  },
},
{
  timestamps: true
})

module.exports = cartSchema