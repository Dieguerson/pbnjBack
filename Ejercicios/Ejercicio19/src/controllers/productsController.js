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

const modifyProduct = async (productId, product) => {
  try {
    await products.modify(productId, product);
  } catch (error) {
    logger.error(error)
  }
}

const deleteProduct = async (productId) => {
  try {
    await products.deleteById(productId);
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { fetchProducts, saveNewProduct, deleteProduct, modifyProduct }