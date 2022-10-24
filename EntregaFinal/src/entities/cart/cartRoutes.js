const express = require('express');
const url = require('url')
const { Router } = express;
let router = new Router();

const { fetchCartById, addToCart, clearCart, deleteFromCart } = require('./cartController')

const {passport} = require('../../utils/passport');
const routes = require('../../utils/routes')

router.get('/carrito', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { cartId } = req.user
    const cartById = await fetchCartById(cartId)
    res.render("handlebars/cart.hbs", {script: '/scripts/cart.js', cart: cartById, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.post('/carrito/productos', passport.authenticate('auth', {session: false}), (req, res, next) => {
  if (req.isAuthenticated()) {
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

router.post('/carrito/:id/productos', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    const { ammount } = req.body
    const { cartId } = req.user
    await addToCart(cartId, id, ammount)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
})

router.delete('/carrito/:id/', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    await clearCart(id)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
});

router.delete('/carrito/:id/productos/:id_prod', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    const { id_prod } = req.params
    await deleteFromCart(id, id_prod)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
});

module.exports = router;