const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../../utils/routes')

const { fetchProducts, fetchProductById, fetchProductByCategory, saveNewProduct, modifyProduct, deleteProduct, fetchImageById } = require('./productsController')

const logger = require('../../utils/logger');

router.get('/productos', async (req, res) => {
  if(req.session.passport){
    const { admin } = req.session.passport.user
    const allProducts = await fetchProducts();
    res.render("handlebars/products.hbs", {script: '/scripts/products.js', data: {products: allProducts, admin}, routes: routes(req)})
  } else {
    res.redirect('/')
  }
});

router.get('/productos/:toCheck', async (req, res) => {
  if(req.session.passport){
    const { toCheck } = req.params
    const selector = toCheck.length === 24
    if (!selector) {
      const productsByCategory = await fetchProductByCategory(toCheck);
      if (productsByCategory instanceof Error){
        res.render('EJS/error.ejs', {data:{id: 404, description: 'La categoría que estás buscando no existe'}})
      } else {
        res.render("handlebars/products.hbs", {script: '/scripts/products.js', products: productsByCategory, routes: routes(req)})
      }
    } else {
      const productById = await fetchProductById(toCheck);
      if (productById instanceof Error){
        res.render('EJS/error.ejs', {data:{id: 404, description: 'El producto que estás buscando no existe'}})
      } else {
        res.render("handlebars/products.hbs", {script: '/scripts/products.js', products: [productById], routes: routes(req)})
      }
    }
  } else {
    res.redirect('/')
  }
})

router.get('/producto/:id', async (req, res) =>{
  if(req.session.passport){
    const { id } = req.params;
    const productById = await fetchProductById(id);
    res.status(200).send(productById)
  } else {
    res.redirect('/')
  }
});

router.post('/api/productos/:auth', async (req, res) => {
  if(req.session.passport){
    const user_type = req.params.auth
    if (user_type === 'admin') {    
      const { newItem } = req.body;
      await saveNewProduct(newItem);
      res.status(200).send()
    } else {
      logger.warn(`Intento de navegación a POST /productos/:auth con una cuenta no autorizada`)
      res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos POST a la ruta /api/productos. Comuníquese con su administrador.'})
    }
  } else {
    res.redirect('/')
  }
});

router.put('/api/productos/:auth/:id', async (req, res) => {
  if(req.session.passport){
    const user_type = req.params.auth
    if (user_type === 'admin') {
      const id = req.params.id;
      const { modifiedItem } = req.body;
      await modifyProduct(id, modifiedItem)
      res.status(200).send();
    } else {
      logger.warn(`Intento de navegación a PUT /productos/:auth/:id con una cuenta no autorizada`)
      res.send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos PUT a la ruta /api/productos. Comuníquese con su administrador.'})
    }
  } else {
    res.redirect('/')
  }
})

router.delete('/api/productos/:auth/:id', async (req, res) => {
  if(req.session.passport){
    const user_type = req.params.auth
    if (user_type === 'admin') {
      const { id } = req.params;
      await deleteProduct(id)
      res.status(200).send();
    } else {
      logger.warn(`Intento de navegación a DELETE /productos/:auth/:id con una cuenta no autorizada`)
      res.status(401).send({Error: 401, descripcion: 'Su cuenta no tiene permiso para realizar pedidos DELETE a la ruta /api/productos. Comuníquese con su administrador.'})
    }
  } else {
    res.redirect('/')
  }
});

router.get('/images/:id', async (req, res) => {
  if(req.session.passport){
      const { id } = req.params;
      const image = await fetchImageById(id)
      res.redirect(image);
  } else {
    res.redirect('/')
  }
});

module.exports = router;