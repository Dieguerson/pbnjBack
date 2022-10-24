const logger = require('../../utils/logger')
const UsersRepository = require('./UserRepository')
const users = new UsersRepository()

const { saveNewCart, fetchCartById } = require('../cart/cartController')

const { sendMail } = require('../../utils/mailing')

const { pathFormatter } = require('../../utils/multer')

const sendMessage = require('../../utils/messaging')

const { sendMailPurchase } = require('../../utils/mailing')

const fetchUsers = async () => {
  try {
    const foundUsers = await users.getAll()
    return foundUsers
  } catch (error) {
    logger.error({error})
  }
}

const fetchUserById = async (id) => {
  try {
    const foundUser = await users.getById(id)
    return foundUser
  } catch (error) {
    logger.error({error})
  }
}

const saveNewUser = async (newUser, avatarURL) => {
  const newCart = {
    email: newUser._id,
    products: [],
    address: newUser.address
  }
  const newCartId = await saveNewCart(newCart)
  newUser.cartId = newCartId
  newUser.avatarURL = pathFormatter(avatarURL)
  try {
    await users.save(newUser)
    sendMail(newUser)
  } catch (error) {
    logger.error({error})
  }
}

const startPurchase = async (userId, cartId) => {
  const { phone: userPhone, _id: userEmail, name: userName } = await fetchUserById(userId)
  const fetchedCart = await fetchCartById(cartId)
  sendMessage(fetchedCart, userPhone, userEmail, userName)
  sendMailPurchase(fetchedCart, userEmail, userName)
}

module.exports = { fetchUsers, fetchUserById, saveNewUser, startPurchase }