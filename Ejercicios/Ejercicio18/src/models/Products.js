const {Schema} = require("mongoose")

const productsSchema = new Schema ({
  price: {
    type: String,
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
  innerId: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
})

module.exports = productsSchema