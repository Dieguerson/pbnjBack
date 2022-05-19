const options = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './DB/ecommerce.sqlite'
  },
  useNullAsDefault: true,
})

options.schema.createTableIfNotExists("messages", function(table){
  table.increments().primary()
  table.string('date')
  table.string('mail')
  table.decimal('message')
})
.then (() => {
  console.log("Connected to SQLite3")
})
.catch((err) => {
  console.log(err)
})

module.exports = options