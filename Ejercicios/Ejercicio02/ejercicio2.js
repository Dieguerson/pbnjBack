const Contenedor = require("./Contenedor.js");

const productos = new Contenedor("productos.txt");
const escuadra = {
  title: 'Escuadra',
  price: 123.45,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}
const calculadora = {
  title: 'Calculadora',
  price: 234.56,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}
const globo =    {
  title: 'Globo Terráqueo',
  price: 345.67,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
}

productos.save(escuadra)
setTimeout(() => {
  productos.save(calculadora)
  setTimeout(() => {
    productos.save(globo)
    setTimeout(() => {
      productos.getById(1)
      productos.getById(100)
      productos.getAll()
      productos.deleteById(3)
      setTimeout(() => {
        productos.getAll()
        setTimeout(() => {
          productos.deleteAll()
          productos.getAll()
        }, 200)
      },200)
    },200)
  },200)
},500)

const preexistente = new Contenedor("preexistente.txt");
const nacho = {
  nombre: 'Nacho',
  id: 1,
}
const colo = {
  nombre: 'Colo',
  id: 2,
}
const mel = {
  nombre: 'Mel',
  id: 3,
}

preexistente.getAll()
setTimeout(() =>{
  preexistente.save(nacho)
  setTimeout(() => {
    preexistente.save(colo)
    setTimeout(() => {
      preexistente.save(mel)
      setTimeout(() => {
        preexistente.getById(1)
        preexistente.getById(100)
        preexistente.getAll()
        preexistente.deleteById(3)
        setTimeout(() => {
          preexistente.getAll()
          setTimeout(() => {
            preexistente.deleteAll()
            preexistente.getAll()
          }, 200)
        },200)
      },200)
    },200)
  },500)
},200)