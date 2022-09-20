const express = require('express');
const { Router } = express;
let router = new Router();

const { fetchProducts } = require('../controllers/productsController');

router.get('/productos', async (_, res) => {
  let products = await fetchProducts()
  res.send(products);
})

module.exports = router