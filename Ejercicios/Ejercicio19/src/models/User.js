const {Schema} = require("mongoose")

const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
  },
  password:{
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

module.exports = userSchema