const express = require('express');
const { Router } = express;
const passport = require('../../passport')
let router = new Router();
const routes = require('../../routes')

router.use(express.json())

router.get('/login', (req, res) => {
  res.render("login", {script: '/scripts/login.js', routes: routes(req)})
})

router.post('/login', passport.authenticate('auth'), (req, res) => {
  console.log(req.session)
  res.status(200).send()
})

router.get('/logout', (req, res) => {
  console.log(req.session)
  req.session.destroy()
  console.log(req.session)
  res.status(200).send()
})

module.exports = router;