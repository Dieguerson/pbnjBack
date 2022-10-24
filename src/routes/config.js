const express = require('express');
const { Router } = express;
let router = new Router();

const routes = require('../utils/routes')
const {passport} = require('../utils/passport');
const envReader = require('../utils/.envReader')

const prodConfig = [
  {
    key: NODE_TLS_REJECT_UNAUTHORIZED,
    value: process.env.NODE_TLS_REJECT_UNAUTHORIZED
  },
  {
    key: G_MAIL,
    value: process.env.G_MAIL
  },
  {
    key: G_MAIL_PASS,
    value: process.env.G_MAIL_PASS
  },
  {
    key: TWILIO_ACCOUNT,
    value: process.env.TWILIO_ACCOUNT
  },
  {
    key: TWILIO_AUTH,
    value: process.env.TWILIO_AUTH
  },
  {
    key: TWILIO_SMS_NUMBER,
    value: process.env.TWILIO_SMS_NUMBER
  },
  {
    key: TWILIO_WA_NUMBER,
    value: process.env.TWILIO_WA_NUMBER
  },
  {
    key: ADMIN_NUMBER,
    value: process.env.ADMIN_NUMBER
  },
  {
    key: NODE_ENV,
    value: process.env.NODE_ENV
  },
  {
    key: PORT_DEV,
    value: process.env.PORT_DEV
  },
  {
    key: MODE_DEV,
    value: process.env.MODE_DEV
  },
  {
    key: MONGO_URL_DEV,
    value: process.env.MONGO_URL_DEV
  },
  {
    key: COOKIE_EXPIRATION_DEV,
    value: process.env.COOKIE_EXPIRATION_DEV
  },
  {
    key: PORT_PROD,
    value: process.env.PORT_PROD
  },
  {
    key: MODE_PROD,
    value: process.env.MODE_PROD
  },
  {
    key: MONGO_URL_PROD,
    value: process.env.MONGO_URL_PROD
  },
  {
    key: COOKIE_EXPIRATION_PROD,
    value: process.env.COOKIE_EXPIRATION_PROD
  }
]

const { NODE_ENV } = process.env

const config = NODE_ENV === 'DEV' ? envReader : prodConfig

router.get('/config', passport.authenticate('auth', {session: false}), function(req, res) {
  if (req.isAuthenticated()) {
    res.render("handlebars/config.hbs", {config: config, routes: routes(req)})
  } else {
    res.redirect('/')
  }
});

module.exports = router;