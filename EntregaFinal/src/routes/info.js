const express = require('express');
const { Router } = express;
let router = new Router();

const informer = require('../utils/informer')

router.get('/info', function(req, res) {
  res.render("pug/info.pug", {info: informer()})
});

module.exports = router;