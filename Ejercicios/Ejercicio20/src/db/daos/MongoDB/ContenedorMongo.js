const config = require('../../config/config');
const mongoose = require('mongoose')

mongoose.connect(config.mongoDB.url, config.mongoDB.options)

class ContenedorMongo {
  constructor(collection, schema) {
    this.table = mongoose.model(collection, schema);
  };

  async save(object) {
    let db;

    const currentDb = await this.table.find()
    const dbExists = currentDb.length > 0

    let sortedDb

    if (dbExists) {
      sortedDb = currentDb.sort((a , b) => {
        return a.innerId - b.innerId
      })
    } else {
      sortedDb = currentDb
    }

    const lastInnerId = sortedDb[sortedDb.length - 1]?.innerId

    object.innerId = lastInnerId ? lastInnerId + 1 : 1

    await this.table.create(object)
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

  async modify(id, object) {
    let db;

    await this.table.findOneAndUpdate({innerId:id}, object)
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

    await this.table.find({_id: id})
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
        if (db.length > 0) {
          db.sort((a, b) => {
            return a.innerId - b.innerId
          })
        }
      })
      .catch(err => console.log(err));
    return db;
  }

  async deleteById(id) {
    let db;

    await this.table.findOneAndDelete({innerId: id})
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

module.exports = ContenedorMongo;