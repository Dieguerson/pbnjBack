const HandlerMongo = require('../../database/MongoAtlas/daos/BaseMongoDao')
const Products = require('./ProductsModel')

class ProductsMongoDao extends HandlerMongo {
  static instance
  
  constructor() {
    super('products', Products)
  }

  static getInstance() {
    if (!ProductsMongoDao.instance) {
      ProductsMongoDao.instance = new ProductsMongoDao()
    }

    return ProductsMongoDao.instance
  }}

module.exports = ProductsMongoDao