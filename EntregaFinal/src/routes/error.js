const express = require('express');
const { Router } = express;
let router = new Router();

const logger = require('../utils/logger')

router.get('*', function(req, res) {
  const route = req.originalUrl
  const method = req.method
  logger.warn(`Intento de navegación a ${method} ${route}`)
  res.render('EJS/error.ejs', {data:{id: 404, description: `La ruta ${route}no está disponible para el método ${method}`}})
});

module.exports = router;