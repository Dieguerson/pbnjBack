const express = require('express');
const { Router } = express;
let router = new Router();

const passport = require('../utils/passport')

const routes = require('../utils/routes')

router.use(express.json())

router.get('/login', (req, res) => {
  res.render("login", {script: '/scripts/login.js', routes: routes(req)})
})

router.post('/login', passport.authenticate('auth'), (_, res) => {
  res.status(200).send()
})

router.get('/salir', (req, res) => {
  req.session.destroy()
  res.status(200).send()
})

module.exports = router;