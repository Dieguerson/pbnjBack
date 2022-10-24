const express = require('express');
const url = require('url')
const { Router } = express;
let router = new Router();

const { fetchCartById, addToCart, clearCart, deleteFromCart } = require('./cartController')

const routes = require('../../utils/routes')

router.get('/carrito', async (req, res) => {
  if(req.session.passport){
    const { cartId } = req.session.passport.user
    const cartById = await fetchCartById(cartId)
    res.render("handlebars/cart.hbs", {script: '/scripts/cart.js', cart: cartById, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.post('/carrito/productos', (req, res, next) => {
  if (req.session.passport) {
    const { id } = req.body
    const { ammount } = req.body
    res.redirect(307, url.format({
      pathname: `/carrito/${id}/productos`,
      ammount: Number(ammount)
    }))
    next()
  } else {
    res.redirect('/')
  }
})

router.post('/carrito/:id/productos', async (req, res) => {
  if(req.session.passport){
    const { id } = req.params;
    const { ammount } = req.body
    const { cartId } = req.session.passport.user
    await addToCart(cartId, id, ammount)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
})

router.delete('/carrito/:id/', async (req, res) => {
  if(req.session.passport){
    const { id } = req.params;
    await clearCart(id)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
});

router.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
  if(req.session.passport){
    const { id } = req.params;
    const { id_prod } = req.params
    await deleteFromCart(id, id_prod)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
});

module.exports = router;