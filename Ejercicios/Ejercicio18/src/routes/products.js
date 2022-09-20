const express = require('express');
const { Router } = express;
let router = new Router();

const { fetchProducts, saveNewProduct } = require('../controllers/productsController');

router.get('/productos', async (_, res) => {
  let products = await fetchProducts()
  res.send(products);
})

router.post('/productos', async (req, res) => {
  await saveNewProduct(req.body.fakeProd)
  let products = await fetchProducts()
  res.send(products);
})

module.exports = router