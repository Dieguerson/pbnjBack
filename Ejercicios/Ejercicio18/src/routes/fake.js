const express = require('express');
const { Router } = express;
let router = new Router();

const fakeProds = require('../controllers/fakeController');

router.get('/productos-test', (req, res) => {
  const { ammount } = req.query
  res.render('fakeProds', {fakeProds: fakeProds(ammount)});
});

module.exports = router