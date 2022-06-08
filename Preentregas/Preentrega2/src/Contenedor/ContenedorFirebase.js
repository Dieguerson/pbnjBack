const { database } = require('firebase-admin');
const admin = require('firebase-admin');
const config = require('../config')

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://pbnj-d2e44-default-rtdb.firebaseio.com"
})

const db = admin.firestore()

class ContenedorDB {
  constructor(collection) {
    this.collection = db.collection(collection);
  };

  async save(object) {
    let toReturn

    await this.collection.add(object)
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