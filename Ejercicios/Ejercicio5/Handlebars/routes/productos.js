const express = require('express');
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser');
const { Router } = express;
let router = new Router();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

const Contenedor = require('../Contenedor.js')
const db = new Contenedor('productos.txt');

router.get('/productos', async (req, res) => {
  const gotAll = await db.getAll();
  typeof gotAll === 'string' ? res.render("products", {error: gotAll}) : res.render("products", {data: gotAll});
});

router.post('/productos', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newItem = {
    title,
    price:  Number(price),
    thumbnail
  };
  await db.save(newItem);
  res.render("index");
});

module.exports = router;