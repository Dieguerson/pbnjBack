const admin = require('firebase-admin');
const config = require('../../config/config')

const normalizr = require('normalizr')

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://pbnj-d2e44-default-rtdb.firebaseio.com"
})

const db = admin.firestore()

// const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
// const messageSchema = new normalizr.schema.Entity('message', {
//   author: authorSchema
// }, {idAttribute: 'innerId'})

class ContenedorDB {
  constructor(collection) {
    this.collection = db.collection(collection);
  };

  async save(object) {
    let toReturn;
    const currentFirestore = await this.collection.get()
    const currentDb = currentFirestore.docs.map(doc => {
      return doc.data()
    })
    const dbExists = currentDb.length > 0

    let sortedDb;

    if (dbExists) {
      sortedDb = currentDb.sort((a , b) => {
        const keyA = Object.keys(a.entities.message)[0]
        const keyB = Object.keys(b.entities.message)[0]
        return a.entities.message[keyA].innerId - b.entities.message[keyB].innerId
      })
    } else {
      sortedDb = currentDb
    }

    const lastKey = dbExists ? Object.keys(sortedDb[sortedDb.length - 1]?.entities.message)[0] : 0
    const lastInnerId = sortedDb[sortedDb.length - 1]?.entities.message[lastKey].innerId

    object.innerId = lastInnerId ? lastInnerId + 1 : 1

    const normalized = normalizr.normalize(object, messageSchema)

    await this.collection.add(normalized)
      .then(async ({id}) => {
        await this.collection.doc(id).update({id: id})
        const created = await this.collection.doc(id).get()
        toReturn = {...created.data()}
      })

    return toReturn;
  };

  async modify(id, object) {
    let toReturn

    await this.collection.doc(id).update({...object})
    const updated = await this.collection.doc(id).get()
    toReturn = {...updated.data()}

    return toReturn;
  };

  async getById(id) {
    let toReturn

    const db = await this.collection.doc(id).get()
    toReturn = {...db.data()}

    return toReturn;
  }

  async getAll() {
    let toReturn = []

    const db = await this.collection.get()
    db.forEach(doc => {
      toReturn.push({...doc.data()})
    })
    toReturn.sort((a, b) => {
      return a.code - b.code
    })

    return toReturn;
  }

  async deleteById(id) {
    const db = await this.collection.doc(id).delete()

    return db;
  }

  async deleteAll() {
    const db = await this.collection.listDocuments().then(docs => {
      docs.map(doc => {
        doc.delete()
      })
    })

    return db;
  }
}

module.exports = ContenedorDB;