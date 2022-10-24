const moment = require('moment');

const dateFormatter = (rawDate) => {
  const formattedDate = moment(rawDate).format('DD/MM/YYYY, HH:MM:SS')
  return formattedDate
}

module.exports = dateFormatter