const config = require('../config/config');
const mongoose = require('mongoose')

mongoose.connect(config.mongoDB.url, config.mongoDB.options)

class HandlerMongo {
  constructor(collection, schema) {
    this.table = mongoose.model(collection, schema);
  };

  async save(object) {
    let db;
    let objectId;
    await this.table.create(object)
      .then(async (res) => {
        objectId = res._id
        await this.table.find()
          .then((data) => {
            db = data;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

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
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    return db;
  };

  async getById(id) {
    let byId;

    await this.table.find({_id: id}).lean()
      .then((data) => {
        byId = data;
      })
      .catch(err => console.log(err));

    return byId[0];
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
      .catch(err => console.log(err));

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
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

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
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    return db;
  }
}

module.exports = HandlerMongo;