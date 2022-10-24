const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../utils/routes')
const {passport} = require('../utils/passport');
const informer = require('../utils/informer')

router.get('/info', passport.authenticate('auth', {session: false}), function(req, res) {
  if (req.isAuthenticated()) {
    res.render("pug/info.pug", {info: informer(), routes: routes(req)})
  } else {
    res.redirect('/')
  }
});

module.exports = router;