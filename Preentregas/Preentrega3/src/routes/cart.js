const express = require('express');
const { Router } = express;
let router = new Router();

const bodyParser = require('body-parser');

const Cart = require('../daos/CartMongo')
const Products = require('../daos/ProductsMongo')
const CartDb = new Cart();
const ProductsDb = new Products()

router.use(express.json())
router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));


router.post('/carrito/productos', (req, res, next) => {
  const { id } = req.body
  res.redirect(307, `/api/carrito/${id}/productos`)
  next()
})

router.post('/carrito/:id/productos', async (req, res) => {
  const { id } = req.params;
  const { cartId } = req.session.passport.user
  const cartById = await CartDb.getById(cartId);
  const prodById = await ProductsDb.getById(id);
  cartById.products.push(prodById)
  await CartDb.modify(cartId, cartById)
  res.status(200).send()
})

router.delete('/carrito/:id/', async (req, res) => {
  const { id } = req.params;
  const cartById = await CartDb.getById(id)
  cartById.products = []
  await CartDb.modify(id, cartById)
  res.status(200).send()
});

router.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params
  const cartById = await CartDb.getById(id);
  const prodById = await ProductsDb.getById(id_prod);
  const toDelete = cartById.products.find(poke => poke._id.toString() === prodById._id.toString())
  const index = cartById.products.indexOf(toDelete)
  cartById.products.splice(index, 1)
  await CartDb.modify(id, cartById)
  res.status(200).send()
});

module.exports = router;