const MongoDaoFactory = require('../database/MongoAtlas/MongoDaoFactory')
const { NODE_ENV } = process.env

const dbSelector = () => {
  switch(NODE_ENV.toLowerCase()) {
    case 'dev':
      console.log(`Environment: ${NODE_ENV} - Database: Mongo Local`)
      break
    case 'prod':
      console.log(`Environment: ${NODE_ENV} - Database: Mongo Atlas`)
      break
    default: 
      console.log('NODE_ENV not found - Database: Mongo Atlas')
  }
  return new MongoDaoFactory()
}

module.exports = dbSelector()