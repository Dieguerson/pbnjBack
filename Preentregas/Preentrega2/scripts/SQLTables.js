const knex = require('knex');
const config = require('../src/config');

const settings = knex(config.mariaDB)

const createTables = () => {
    settings.schema.createTableIfNotExists("productos", function(table){
    table.increments('id').primary()
    table.string('name')
    table.integer('code')
    table.string('description')
    table.string('thumbnail')
    table.decimal('price')
    table.integer('stock')
    table.timestamp('timestamp')
  })
  .then (() => {
    console.log('Table "productos" Created/Exists')
  })
  .catch((err) => {
    console.log(err)
  })

  settings.schema.createTableIfNotExists("carrito", function(table){
    table.increments('id').primary()
    table.string('message')
    table.json('products')
    table.timestamp('timestamp')
  })
  .then (() => {
    console.log('Table "carrito" Created/Exists')
  })
  .catch((err) => {
    console.log(err)
  })
}

createTables()
module.exports = createTables