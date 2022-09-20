const express = require('express');
const { Router } = express;
let router = new Router();

const script = process.env.ENVIRON === "heroku" ? '/scripts/mainHeroku.js' : '/scripts/main.js'

router.get('/', (_, res) => {
  res.render('index', {script})
});

module.exports = router;