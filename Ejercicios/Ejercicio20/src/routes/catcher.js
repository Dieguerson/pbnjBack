const express = require('express');
const { Router } = express;
let router = new Router();

const badRouteLogger = require('../controllers/catcherController');

router.get('*', (req, res) => {
  badRouteLogger(req.url, req.method)
  res.redirect(307, '/')
})

module.exports = router