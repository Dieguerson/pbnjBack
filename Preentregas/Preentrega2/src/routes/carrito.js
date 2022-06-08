const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;
const {Carrito, Productos} = require('../daos/dbRandomizer')
let router = new Router();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

const db = new Carrito();
const productos = new Productos()

router.post('/carrito', async (req, res) => {
  const newItem = {
    message: 'No te olvides este número. Lo vas a necesitar!',
    products: []
  };
  await db.save(newItem);
  const updatedDb = await db.getAll();
  const fullNew = updatedDb[updatedDb.length - 1]
  res.send(fullNew);
});

router.post('/carrito/productos', (req, res, next) => {
  id = req.body.cart
  console.log(id)
  res.redirect(307, `/api/carrito/${id}/productos`)
  next()
})

router.get('/carrito/:id/productos', async (req, res) => {
  const id = req.params.id;
  const gotId = await db.getById(id);
  res.send(gotId.products)
})

router.post('/carrito/:id/productos', async (req, res) => {
  const id = req.params.id;
  const prodId = req.body.product
  const gotId = await db.getById(id);
  const gotProdId = await productos.getById(prodId);
  gotId.products.push(gotProdId)
  if(process.env.DB === "MySQL"){
    gotId.products = JSON.stringify(gotId.products)
  }
  res.send(await db.modify(id, gotId))
})

router.delete('/carrito/:id/', async (req, res) => {
  const id = req.params.id;
  res.send(await db.deleteById(id))
});

router.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
  const id = req.params.id;
  const prodId = req.params.id_prod
  const gotId = await db.getById(id);
  const gotProdId = await productos.getById(prodId);
  const toDelete = gotId.products.find(poke => poke.id === gotProdId.id)
  const index = gotId.products.indexOf(toDelete)
  gotId.products.splice(index, 1)
  res.send(await db.modify(id, gotId))
});

module.exports = router;