const knex = require('knex');
const config = require('../config')
const knexPlus = knex(config.mariaDB);
const tables = require('../../scripts/SQLTables')

class ContenedorDB {
  constructor(table) {
    this.table = table;
  };

  async save(object) {
    let db;

    if (this.table === 'carrito') {
      object.products = JSON.stringify(object.products)
    }
    
    await knexPlus(this.table).insert(object)
      .then(async () => {
        await knexPlus.from(this.table).select('*')
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

    console.log(id, object)

    await knexPlus(this.table).where({ id: id }).update(object)
      .then(async () => {
        await knexPlus.from(this.table).where({ id: id })
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

    await knexPlus.from(this.table).where({ id: id })
      .then((data) => {
        byId = data;
        if (this.table === "carrito") {
          byId[0].products = JSON.parse(byId[0].products)
          console.log(byId)
        }
      })
      .catch(err => console.log(err));

    return byId[0];
  }

  async getAll() {
    let db;
    await knexPlus.from(this.table).select('*')
      .then((data) => {
        db = data;
      })
      .catch(err => console.log(err));

    return db;
  }

  async deleteById(id) {
    let db;

    await knexPlus(this.table).where({ id: id }).del()
      .then(async () => {
        await knexPlus.from(this.table).select('*')
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

    await knexPlus(this.table).del()
      .then(async () => {
        await knexPlus.from(this.table).select('*')
          .then((data) => {
            db = data;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    return db;
  }
}

module.exports = ContenedorDB;