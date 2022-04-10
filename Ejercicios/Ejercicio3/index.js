const express = require("express");
const path = require("path")


const PORT = process.env.PORT || 8080

const Contenedor = require("./Contenedor.js");
const productos = new Contenedor("productos.txt");

const app = express();

app.get("/", (req, res) => { 
  res.sendFile(path.join(__dirname+"/index.html"))
})

app.get("/productos", async (req, res) => { 
  res.send(await productos.getAll())
})

app.get("/productoRandom", async (req, res) => { 
  const randomizer = Math.floor(5 * Math.random())
  const product = await productos.getById(randomizer)
  res.send({ID: randomizer, Producto: product})
})