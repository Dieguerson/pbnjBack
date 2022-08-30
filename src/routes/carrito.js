const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;
const Carrito = require('../daos/CarritoMongo')
const Productos = require('../daos/ProductosMongo')
let router = new Router();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
router.use(express.json())

const db = new Carrito();
const productos = new Productos()

router.post('/carrito', async (req, res) => {
  const newItem = {
    message: 'No te olvides este número. Lo vas a necesitar!',
    products: []
  };
  const create = await db.save(newItem);
  res.send(create);
});

router.post('/carrito/productos', (req, res, next) => {
  const { id } = req.body
  res.redirect(307, `/api/carrito/${id}/productos`)
  next()
})

router.get('/carrito/:id/productos', async (req, res) => {
  const { id } = req.params;
  const gotId = await db.getById(id);
  res.send(gotId.products)
})

router.post('/carrito/:id/productos', async (req, res) => {
  const { id } = req.params;
  const { cartId } = req.session.passport.user
  const gotCartId = await db.getById(cartId);
  const gotProdId = await productos.getById(id);
  console.log(gotCartId)
  gotCartId.products.push(gotProdId)
  console.log(gotCartId)
  await db.modify(cartId, gotCartId)
  res.status(200).send()
})

router.delete('/carrito/:id/', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const gotCartId = await db.getById(id)
  gotCartId.products = []
  await db.modify(id, gotCartId)
  res.status(200).send()
});

router.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params
  const gotCartId = await db.getById(id);
  const gotProdId = await productos.getById(id_prod);
  const toDelete = gotCartId.products.find(poke => poke._id.toString() === gotProdId._id.toString())
  const index = gotCartId.products.indexOf(toDelete)
  gotCartId.products.splice(index, 1)
  await db.modify(id, gotCartId)
  res.status(200).send()
});

module.exports = router;