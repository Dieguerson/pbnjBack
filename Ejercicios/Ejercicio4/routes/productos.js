const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;
let router = new Router();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

const Contenedor = require('../Contenedor.js')
const db = new Contenedor('productos.txt');

router.get('/productos', async (req, res) => {
  const gotAll = await db.getAll();
  res.send(gotAll);
});

router.get('/productos/:id', async (req, res) =>{
  const id = Number(req.params.id);
  const gotId = await db.getById(id);
  res.send(gotId);
});

router.post('/productos', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newItem = {
    title,
    price:  Number(price),
    thumbnail
  };
  await db.save(newItem);
  const updatedDb = await db.getAll();
  const fullNew = updatedDb[updatedDb.length - 1]
  res.send(fullNew);
});

router.put('/productos/:id', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const id = Number(req.params.id);
  const changedItem = {
    title,
    price,
    thumbnail,
    id
  };
  res.send(await db.modify(changedItem));
})

router.delete('/productos/:id', async (req, res) => {
  const id = Number(req.params.id);
  res.send(await db.deleteById(id));
});

module.exports = router;