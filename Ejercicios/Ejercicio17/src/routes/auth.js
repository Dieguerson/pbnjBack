const express = require('express');
const { Router } = express;
let router = new Router();

const passport = require('../utils/passport')

const { saveNewUser } = require('../controllers/authController');


router.get('/auth', (_, res) => {
  res.render('auth', {script: '/scripts/auth.js'});
})

router.post('/register', passport.authenticate('register'), async (req, res) => {
  const { newUser } = req
  await saveNewUser(newUser)
  res.status(200).send()
})

router.post('/login', passport.authenticate('auth'), (_, res) => {
  res.status(200).send()
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.status(200).send();
})

module.exports = router