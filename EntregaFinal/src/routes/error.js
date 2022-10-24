const express = require('express');
const { Router } = express;
let router = new Router();

const logger = require('../utils/logger')

router.get('*', function(req, res) {
  const route = req.originalUrl
  const method = req.method
  logger.warn(`Intento de navegación a ${method} ${route}`)
  res.send({error: 404, descripcion:`Erm, nos descubriste. No implementamos ${method} para la ruta ${route}`})
});

module.exports = router;