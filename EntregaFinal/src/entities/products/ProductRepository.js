const ProductsDto = require('./ProductsDto')
const chosenDb = require('../../database/dbSelector')

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

  async getById(id) {
    const product = await this.dao.getById(id)
    if (product instanceof Error) {
      return product
    }
    const plainedProduct = new ProductsDto(product)
    
    return plainedProduct;
  }

  async getByCategory(category) {
    const products = await this.dao.getByCategory(category)
    if (products instanceof Error) {
      return products
    }
    const plainedProducts = products.map(product => {
      return new ProductsDto(product)
    })
    
    return plainedProducts;
  }

  async save(product) {
    const plainProduct = new ProductsDto(product)
    await this.dao.save(plainProduct);
  }

  async modify(id, product) {
    await this.dao.modify(id, product);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }
}

module.exports = ProductRepository