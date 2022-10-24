const express = require('express');
const { Router } = express;
let router = new Router();

const {passport} = require('../../utils/passport');
const routes = require('../../utils/routes')

const { NODE_ENV } = process.env

const scripts = NODE_ENV ===  'DEV' ? ['/scripts/chat.js'] : ['/scripts/herokuSocket.js', '/scripts/chat.js']

router.get('/chat', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { admin } = req.user
    const { _id } = req.user
    res.render("handlebars/chat.hbs", {script: scripts, routes: routes(req), data: {admin, _id}})
  } else {
    res.redirect('/')
  }
})

router.get('/chat/:email', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    res.render("handlebars/chat.hbs", {script: scripts, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

module.exports = router;