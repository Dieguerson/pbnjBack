const express = require('express');
const { Router } = express;
let router = new Router();

const bodyParser = require('body-parser');

const Products = require('../daos/ProductsMongo')
const ProductsDb = new Products();

const logger = require('../utils/logger')

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

router.get('/productos', async (_, res) => {
  const allProducts = await ProductsDb.getAll();
  res.send(allProducts);
});

router.get('/productos/:id', async (req, res) =>{
  const { id } = req.params;
  const productById = await ProductsDb.getById(id);
  res.send(productById);
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
    const savedProduct = await ProductsDb.save(newItem);
    res.send(savedProduct);
  } else {
    logger.warn(`Intento de navegación a POST /productos/:auth con una cuenta no autorizada`)
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos POST a la ruta /api/productos. Comuníquese con su administrador.'})
  }
});

router.put('/productos/:auth/:id', async (req, res) => {
  const user_type = req.params.auth
  if (user_type === 'admin') {
    const { name, code, description, thumbnail, price, stock } = req.body;
    const id = req.params.id;
    const changedItem = {
      name,
      code: Number(code),
      description,
      thumbnail,
      price:  Number(price),
      stock: Number(stock),
      id
    };
    res.send(await ProductsDb.modify(id, changedItem));
  } else {
    logger.warn(`Intento de navegación a PUT /productos/:auth/:id con una cuenta no autorizada`)
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos PUT a la ruta /api/productos. Comuníquese con su administrador.'})
  }
})

router.delete('/productos/:auth/:id', async (req, res) => {
  const user_type = req.params.auth
  if (user_type === 'admin') {
    const { id } = req.params;
    res.send(await ProductsDb.deleteById(id));
  } else {
    logger.warn(`Intento de navegación a DELETE /productos/:auth/:id con una cuenta no autorizada`)
    res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos DELETE a la ruta /api/productos. Comuníquese con su administrador.'})
  }
});

module.exports = router;