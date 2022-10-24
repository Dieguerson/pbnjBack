const logger = require('../../utils/logger')

const ProductsRepository = require('./ProductRepository')
const products = new ProductsRepository()

const fetchProducts = async () => {
  try {
    return await products.getAll();
  } catch (error) {
    logger.error({error})
  }
}

const fetchProductById = async (id) => {
  try {
    return await products.getById(id);
  } catch (error) {
    logger.error(error)
  }
}

const fetchProductByCategory = async (category) => {
  try {
    return await products.getByCategory(category);
  } catch (error) {
    logger.error(error)
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

const fetchImageById = async (id) => {
  try {
    const product = await products.getById(id)
    return product.thumbnail;
  } catch (error) {
    logger.error({error})
  }
}

module.exports = { fetchProducts, fetchProductById, fetchProductByCategory, saveNewProduct, deleteProduct, modifyProduct, fetchImageById }