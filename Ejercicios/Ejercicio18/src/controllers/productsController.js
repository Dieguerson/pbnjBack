const logger = require('../utils/logger')

const ProductsRepository = require('../db/Repositories/ProductRepository')
const products = new ProductsRepository()

const fetchProducts = async () => {
  try {
    return await products.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const saveNewProduct = async (newProduct) => {
  try {
    await products.save(newProduct);
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { fetchProducts, saveNewProduct }