const express = require('express');
const { Router } = express;
let router = new Router();

const {passport} = require('../../utils/passport');
const routes = require('../../utils/routes')

router.get('/chat', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { admin } = req.user
    const { _id } = req.user
    res.render("handlebars/chat.hbs", {script: '/scripts/chat.js', routes: routes(req), data: {admin, _id}})
  } else {
    res.redirect('/')
  }
})

router.get('/chat/:email', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    res.render("handlebars/chat.hbs", {script: '/scripts/chat.js', routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

module.exports = router;