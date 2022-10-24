const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../utils/routes')
const {passport} = require('../utils/passport');
const envReader = require('../utils/.envReader')

router.get('/config', passport.authenticate('auth', {session: false}), function(req, res) {
  if (req.isAuthenticated()) {
    res.render("handlebars/config.hbs", {config: envReader, routes: routes(req)})
  } else {
    res.redirect('/')
  }
});

module.exports = router;