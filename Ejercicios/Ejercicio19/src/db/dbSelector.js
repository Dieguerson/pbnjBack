const FirebaseDaoFactory = require('../db/daos/Firebase/FirebaseDaoFactory')
const MongoDaoFactory = require('../db/daos/MongoDB/MongoDaoFactory')
const { DATABASE } = process.env

const dbSelector = () => {
  switch(DATABASE.toLowerCase()) {
    case 'firebase':
      console.log('DB Seleccionada:', DATABASE.toLowerCase())
      return FireFactory = new FirebaseDaoFactory()
    case 'mongo':
      console.log('DB Seleccionada:', DATABASE.toLowerCase())
      return MongoFactory = new MongoDaoFactory()
    default: 
    console.log('DB Default: Firebase')
      return FireFactory = new FirebaseDaoFactory()
  }
}

module.exports = dbSelector()