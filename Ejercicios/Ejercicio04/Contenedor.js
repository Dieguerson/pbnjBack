const fs = require("fs");

class Contenedor{
  constructor(file){
    this.file = "./public/" + file;
  }

  async save(obj){
    let precursor = []

    await fs.promises.readFile(this.file, {encoding: "utf-8"})
      .then(res => precursor = JSON.parse(res))
      .catch(async (err) =>{
        await fs.promises.writeFile(this.file, JSON.stringify([{title: "Aquí comienza tu archivo", price: 0.0, id:0}]), {encoding: "utf-8"})
        console.log(err)
      })
      .finally(async () => await fs.promises.readFile(this.file, {encoding: "utf-8"})
        .then(res => precursor = JSON.parse(res))
        .catch(err => console.log(err)))
    
    const id = precursor[precursor.length-1]?.id;

    if (id === undefined || id === null ) {
      obj.id = 0;
    } else {
      obj.id = id + 1;
    }

    precursor.push(obj);

    await fs.promises.writeFile(this.file, JSON.stringify(precursor), {encoding: "utf-8"})
      .then(() => console.log(obj.id))
      .catch((err) => {
        throw "Algo malió sal en el guardado!"
      });
  }

  async modify(obj){
    let precursor = []
    let toReturn

    await fs.promises.readFile(this.file, {encoding: "utf-8"})
      .then(res => precursor = JSON.parse(res))
      .catch(async (err) =>{
        console.log(err)
      })
      .finally(async () => await fs.promises.readFile(this.file, {encoding: "utf-8"})
        .then(res => precursor = JSON.parse(res))
        .catch(err => console.log(err)))
    
    precursor.map(item => {
      if (item.id === obj.id) {
        const toModify = precursor[precursor.indexOf(item)]
        toModify.title = obj.title
        toModify.price = obj.price
        toModify.thumbnail = obj.thumbnail
        toModify.id = obj.id 
      }
    })

    await fs.promises.writeFile(this.file, JSON.stringify(precursor), {encoding: "utf-8"})
      .then(() => {
        toReturn = precursor.find(item => item.id === obj.id) || {error: "producto no encontrado"}
      })
      .catch((err) => {
        throw "Algo malió sal en el guardado!"
      });

      return toReturn;
  }

  async getById(id) {
    let database = []
    let toReturn
    await fs.promises.readFile(this.file, {encoding: "utf-8"})
    .then(res => database = JSON.parse(res))
    .catch(err => {
        throw "Algo malió sal en la averiguación por id!"
    })
    .finally(() => {
      toReturn = database.find(element => element.id === id) || {error: "producto no encontrado"}
    })
    return toReturn
  }

  async getAll() {
    let database = []
    await fs.promises.readFile(this.file, {encoding: "utf-8"})
    .then(res => database = JSON.parse(res))
    .catch(err => {
        throw "Algo malió sal en la averiguación!"
    })
    .finally(() => {
      console.table(database)
    })
    return database
  }

  async deleteById(id) {
    let database = []
    await fs.promises.readFile(this.file, {encoding: "utf-8"})
    .then(res => database = JSON.parse(res))
    .catch(err => {
        throw "Algo malió sal en la eliminación por id!"
    })
    .finally(() => {
      const start = database.indexOf(database.find(element => element.id === id))
      if (start > 1) {
        database.splice(start, 1)
        fs.writeFileSync(this.file, JSON.stringify(database), {encoding: "utf-8"});
      }
    })

    return database;
  }

  async deleteAll() {
    await fs.promises.writeFile(this.file, JSON.stringify([]), {encoding: "utf-8"})
    .catch(err => {
      throw "Algo malió sal en la eliminación!"
    });
  }
}

module.exports = Contenedor