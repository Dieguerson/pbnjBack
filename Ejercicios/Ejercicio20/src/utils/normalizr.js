const normalizr = require('normalizr')

const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
const messageSchema = new normalizr.schema.Entity('message', {
  author: authorSchema
}, {idAttribute: 'innerId'})

const productSchema = new normalizr.schema.Entity('product', {}, {idAttribute: 'innerId'})