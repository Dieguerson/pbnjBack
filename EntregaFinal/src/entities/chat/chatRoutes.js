const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../../utils/routes')

router.get('/chat', async (req, res) => {
  if(req.session.passport){
    const { admin } = req.session.passport.user
    const { _id } = req.session.passport.user
    res.render("handlebars/chat.hbs", {script: '/scripts/chat.js', routes: routes(req), data: {admin, _id}})
  } else {
    res.redirect('/')
  }
})

router.get('/chat/:email', async (req, res) => {
  if(req.session.passport){
    res.render("handlebars/chat.hbs", {script: '/scripts/chat.js', routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

module.exports = router;