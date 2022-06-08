const fs = require("fs");
const moment = require('moment');

class Contenedor{
  constructor(file){
    this.file = "./DB/" + file;
  }

  async save(obj){
    let precursor = []
    let toReturn

    await fs.promises.readFile(this.file, {encoding: "utf-8"})
      .then(res => precursor = JSON.parse(res))
      .catch(async (err) =>{
        await fs.promises.writeFile(this.file, JSON.stringify([]), {encoding: "utf-8"})
        console.log(err)
      })
      .finally(async () => await fs.promises.readFile(this.file, {encoding: "utf-8"})
        .then(res => precursor = JSON.parse(res))
        .catch(err => console.log(err)))
    
    const id = precursor[precursor.length-1]?.id;

    if (id === undefined || id === null ) {
      obj.id = 1;
    } else {
      obj.id = Number(id) + 1;
    }

    obj.timestamp = moment().format('DD/MM/YYYY, HH:MM:SS');

    precursor.push(obj);

    await fs.promises.writeFile(this.file, JSON.stringify(precursor), {encoding: "utf-8"})
      .then(() => toReturn = obj)
      .catch((err) => {
        throw "Algo malió sal en el guardado!"
      });

    return toReturn
  }

  async modify(id, obj){
    let precursor = []
    let toReturn

    obj.timestamp = moment().format('DD/MM/YYYY, HH:MM:SS');

    await fs.promises.readFile(this.file, {encoding: "utf-8"})
      .then(res => precursor = JSON.parse(res))
      .catch(async (err) =>{
        console.log(err)
      })
      .finally(async () => await fs.promises.readFile(this.file, {encoding: "utf-8"})
        .then(res => precursor = JSON.parse(res))
        .catch(err => console.log(err)))
    
    precursor.map(item => {
      if (item.id === Number(obj.id)) {
        precursor[precursor.indexOf(item)] = obj
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
      toReturn = database.find(element => element.id === Number(id)) || {error: "producto no encontrado"}
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
      const start = database.indexOf(database.find(element => element.id === Number(id)))
      if (start >= 0) {
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