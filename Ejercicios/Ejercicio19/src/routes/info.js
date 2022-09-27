const express = require('express');
const { Router } = express;
let router = new Router();

const informer = require('../controllers/infoController');

router.get('/info', (_, res) => {
  res.render('info', {infoData: informer()});
});

module.exports = router