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

router.post('/productos/:auth', async (req, res) => {
  const user_type = req.params.auth
  if (user_type === 'admin') {    
    const { name, code, description, thumbnail, price, stock } = req.body;
    const newItem = {
      name,
      code: Number(code),
      description,
      thumbnail,
      price:  Number(price),
      stock: Number(stock)
    };
    await db.save(newItem);
    const updatedDb = await db.getAll();
    const fullNew = updatedDb[updatedDb.length - 1]
    res.send(fullNew);
  } else {
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos POST a la ruta /api/productos. Comuníquese con su administrador.'})
  }
});

router.put('/productos/:auth/:id', async (req, res) => {
  const user_type = req.params.auth
  if (user_type === 'admin') {
    const { name, code, description, thumbnail, price, stock } = req.body;
    const id = Number(req.params.id);
    const changedItem = {
      name,
      code: Number(code),
      description,
      thumbnail,
      price:  Number(price),
      stock: Number(stock),
      id
    };
    res.send(await db.modify(changedItem));
  } else {
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos PUT a la ruta /api/productos. Comuníquese con su administrador.'})
  }
})

router.delete('/productos/:auth/:id', async (req, res) => {
  console.log("delete")
  const user_type = req.params.auth
  if (user_type === 'admin') {
    const id = Number(req.params.id);
    res.send(await db.deleteById(id));
  } else {
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos DELETE a la ruta /api/productos. Comuníquese con su administrador.'})
  }
});

module.exports = router;