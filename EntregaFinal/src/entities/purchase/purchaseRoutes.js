const express = require('express');
const { Router } = express;
let router = new Router();

const { fetchOrdersByEmail, saveNewOrder } = require('./purchaseController')

const routes = require('../../utils/routes')

router.get('/orden', async (req, res) => {
  if(req.session.passport){
    const { _id } = req.session.passport.user
    const orders = await fetchOrdersByEmail(_id)
    res.render("handlebars/purchase.hbs", {orders: orders, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.post('/orden', async (req, res) => {
  if(req.session.passport){
    const { cartId } = req.body;
    await saveNewOrder(cartId)
    res.status(200).send()
  } else {
    res.redirect('/')
  }
})

module.exports = router;