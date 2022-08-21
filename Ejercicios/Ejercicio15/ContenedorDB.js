const knex = require('./db');

class ContenedorDB {
  constructor(table) {
    this.table = table;
  };

  async save(object) {
    let db;

    await knex(this.table).insert(object)
      .then(async () => {
        await knex.from(this.table).select('*')
          .then((data) => {
            db = data;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    return db;
  };

  async modify(id, object) {
    let db;

    await knex(this.table).where({ id: id }).update(object)
      .then(async () => {
        await knex.from(this.table).where({ id: id })
          .then((data) => {
            db = data;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    return db;
  };

  async getById(id) {
    let byId;

    await knex.from(this.table).where({ id: id })
      .then((data) => {
        byId = data;
      })
      .catch(err => console.error(err));

    return byId;
  }

  async getAll() {
    let db;

    await knex.from(this.table).select('*')
      .then((data) => {
        db = data;
      })
      .catch(err => console.error(err));

    return db;
  }

  async deleteById(id) {
    let db;

    await knex(this.table).where({ id: id }).del()
      .then(async () => {
        await knex.from(this.table).select('*')
          .then((data) => {
            db = data;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    return db;
  }

  async deleteAll() {
    let db;

    await knex(this.table).del()
      .then(async () => {
        await knex.from(this.table).select('*')
          .then((data) => {
            db = data;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    return db;
  }
}

module.exports = ContenedorDB;