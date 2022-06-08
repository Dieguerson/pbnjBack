const { env } = require('node:process')

const randomUpToFour = () => {
  return Math.ceil(Math.random() * 4)
}

const dbRandomizer = () => {
  switch (randomUpToFour()) {
    case 1:
      env.DB = 'File System'
      break
    case 2:
      env.DB = 'Firebase'
      break
    case 3:
      env.DB = 'Mongo'
      break
    case 4:
      env.DB = 'MySQL'
      break
  }
}

dbRandomizer()

/*
// Definiciones para fijar la Base de Datos
// env.DB = 'File System'
// env.DB = 'Firebase'
//env.DB = 'Mongo'
// env.DB = 'MySQL'
// FIN - Definiciones para fijar la Base de Datos
*/

let Carrito;
switch (process.env.DB) {
  case 'File System':
    Carrito = require('../daos/Carrito')
    break
  case 'Firebase':
    Carrito = require('../daos/CarritoFirebase')
    break
  case 'Mongo':
    Carrito = require('../daos/CarritoMongo')
    break
  case 'MySQL':
    Carrito = require('../daos/CarritoSQL')
    break
}

let Productos;
switch (process.env.DB) {
  case 'File System':
    Productos = require('../daos/Productos')
    break
  case 'Firebase':
    Productos = require('../daos/ProductosFirebase')
    break
  case 'Mongo':
    Productos = require('../daos/ProductosMongo')
    break
  case 'MySQL':
    Productos = require('../daos/ProductosSQL')
    break
}

module.exports = {Carrito, Productos}