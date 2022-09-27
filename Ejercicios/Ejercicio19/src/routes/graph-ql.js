const express = require('express');
const { Router } = express;
let router = new Router();

const fs = require('fs');
const path = require('path')

const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const schemaString = fs.readFileSync(path.resolve(__dirname + '/../controllers/GraphQL/schema.gql')).toString()
const schema = buildSchema(schemaString)
const { getProducts, createProduct } = require('../controllers/GraphQl/ProductResolver');
const { getUsers, createUser } = require('../controllers/GraphQL/UserResolver')
const { getMessages, createMessage } = require('../controllers/GraphQL/MessageResolver')
const gqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    getProducts,
    createProduct,
    getUsers,
    createUser,
    getMessages,
    createMessage
  },
  graphiql: true
})

router.use('/graphql', gqlMiddleware)

module.exports = router