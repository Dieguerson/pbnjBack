const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../utils/routes')

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/productos')
  } else {
    res.render("handlebars/index.hbs", {script: '/scripts/index.js', routes: routes(req)})
  }
})

module.exports = router;