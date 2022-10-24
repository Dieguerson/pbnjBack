const config = require('../../config/config');

const mongoose = require('mongoose')
mongoose.connect(config.mongoDB.url, config.mongoDB.options)

const logger = require('../../../utils/logger')

class HandlerMongo {
  constructor(collection, schema) {
    this.table = mongoose.model(collection, schema);
  };

  async save(object) {
    let db;
    let objectId;
    await this.table.create(object)
      .then(async (response) => {
        objectId = response._id
        await this.table.find()
          .then((data) => {
            db = data;
          })
          .catch(error => logger.error(error));
      })
      .catch(error => logger.error(error));

    return objectId;
  };

  async modify(id, object) {
    let db;

    await this.table.findOneAndUpdate({_id:id}, object)
      .then(async () => {
        await this.table.find()
          .then((data) => {
            db = data;
          })
          .catch(error => logger.error(error));
      })
      .catch(error => logger.error(error));

    return db;
  };

  async getById(id) {
    let byId;

    await this.table.find({_id: id}).lean()
      .then((data) => {
        byId = data;
      })
      .catch(error => logger.error(error));

    if (byId.length === 0) {
      return new Error('Asset not found')
    }

    return byId[0];
  }

  async getByCategory(category) {
    let db;

    await this.table.find({category: category})
      .then((data) => {
        db = data;
        db.sort((a, b) => {
          return a.code - b.code
        })
      })
      .catch(error => logger.error(error));
      
    if (db.length === 0) {
      return new Error('Asset not found')
    }

    return db;
  }

  async getAll() {
    let db;

    await this.table.find()
      .then((data) => {
        db = data;
        db.sort((a, b) => {
          return a.code - b.code
        })
      })
      .catch(error => logger.error(error));

    return db;
  }

  async deleteById(id) {
    let db;

    await this.table.findOneAndDelete({_id: id})
      .then(async () => {
        await this.table.find()
          .then((data) => {
            db = data;
          })
          .catch(error => logger.error(error));
      })
      .catch(error => logger.error(error));

    return db;
  }

  async deleteAll() {
    let db;

    await this.table.collection.drop()
      .then(async () => {
        await this.table.find()
          .then((data) => {
            db = data;
          })
          .catch(error => logger.error(error));
      })
      .catch(error => logger.error(error));

    return db;
  }
}

module.exports = HandlerMongo;