const logger = require('../utils/logger')

const badRouteLogger = (url, method) => {
  logger.warn(`Ruta ${url} inexistente para el método ${method}`)
}

module.exports = badRouteLogger