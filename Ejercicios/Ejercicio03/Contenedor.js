const fs = require("fs");

class Contenedor{
  constructor(file){
    this.file = "./" + file;
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

  async getById(id) {
    let database = []
    let toReturn
    await fs.promises.readFile(this.file, {encoding: "utf-8"})
    .then(res => database = JSON.parse(res))
    .catch(err => {
        throw "Algo malió sal en la averiguación por id!"
    })
    .finally(() => {
      console.log(database.find(element => element.id === id) || "No Encontramos nada con ese ID")
      toReturn = database.find(element => element.id === id) || "No Encontramos nada con ese ID"
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
  }

  async deleteAll() {
    await fs.promises.writeFile(this.file, JSON.stringify([]), {encoding: "utf-8"})
    .catch(err => {
      throw "Algo malió sal en la eliminación!"
    });
  }
}

module.exports = Contenedor