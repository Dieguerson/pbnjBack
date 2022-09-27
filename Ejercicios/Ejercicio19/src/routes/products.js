const express = require('express');
const { Router } = express;
let router = new Router();

const { fetchProducts, saveNewProduct, deleteProduct, modifyProduct } = require('../controllers/productsController');

router.get('/productos', async (_, res) => {
  let products = await fetchProducts()
  res.send(products);
})

router.post('/productos', async (req, res) => {
  const { product } = req.body
  await saveNewProduct(product)
  let products = await fetchProducts()
  res.send(products);
})

router.put('/productos', async (req, res) => {
  const { id } = req.query
  const { data } = req.body
  await modifyProduct(id, data)
  let products = await fetchProducts()
  res.send(products);
})

router.delete('/productos', async (req, res) => {
  const { id } = req.query
  await deleteProduct(id)
  let products = await fetchProducts()
  res.send(products);
})

module.exports = router