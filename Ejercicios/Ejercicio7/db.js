const knex = require('knex')({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "",
    database: "product_db"
  },
  pool: { 
    min: 2,
    max:8
  }
})

knex.schema.createTableIfNotExists("products", function(table){
  table.increments('id').primary()
  table.string('title')
  table.decimal('price')
  table.string('thumbnail')
})
.then (() => {
  console.log("Connected to mySQL")
})
.catch((err) => {
  console.log(err)
})

module.exports = knex