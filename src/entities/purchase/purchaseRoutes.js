const express = require('express');
const { Router } = express;
let router = new Router();

const { fetchOrdersByEmail, saveNewOrder } = require('./purchaseController')

const {passport} = require('../../utils/passport');
const routes = require('../../utils/routes')

router.get('/orden', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { _id } = req.user
    const orders = await fetchOrdersByEmail(_id)
    res.render("handlebars/purchase.hbs", {orders: orders, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.post('/orden', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { cartId } = req.body;
    await saveNewOrder(cartId)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
})

module.exports = router;