const ProductsDto = require('../dtos/ProductsDto')
const chosenDb = require('../dbSelector')

class ProductRepository {
  constructor() {
    this.dao = chosenDb.getDao('products')
  }

  async getAll() {
    const products = await this.dao.getAll()
    const plainedProducts = products.map(product => {
      return new ProductsDto(product)
    })
    return plainedProducts;
  }

  async save(product) {
    const plainProduct = new ProductsDto(product)
    await this.dao.save(plainProduct);
  }
}

module.exports = ProductRepository