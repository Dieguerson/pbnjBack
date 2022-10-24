const MongoDaoFactory = require('../database/MongoAtlas/MongoDaoFactory')
const { NODE_ENV } = process.env

const dbSelector = () => {
  switch(NODE_ENV.toLowerCase()) {
    case 'dev':
      console.log(`Environment: ${NODE_ENV.toLowerCase()} - Database: Mongo Atlas`)
      return new MongoDaoFactory()
    default: 
      console.log('NODE_ENV not found - Database:Mongo Atlas')
      return new MongoDaoFactory()
  }
}

module.exports = dbSelector()