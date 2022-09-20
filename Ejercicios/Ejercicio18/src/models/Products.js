const {Schema} = require("mongoose")

const productsSchema = new Schema ({
  price: {
    type: Number,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
},
{
  timestamps: true
})

module.exports = productsSchema