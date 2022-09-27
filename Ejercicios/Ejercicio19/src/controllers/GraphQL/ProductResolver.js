const logger = require('../../utils/logger')

const ProductsRepository = require('../../db/Repositories/ProductRepository')
const products = new ProductsRepository()

const createProduct = async ({data}) => {
  const { price, thumbnail, title } = data
  const newProduct = {
    price,
    thumbnail,
    title
  }
  try {
    await products.save(newProduct);
    return newProduct
  } catch (error) {
    logger.error(error)
  }
}

const getProducts = async () => {
  try {
    return await products.getAll();
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { getProducts, createProduct }