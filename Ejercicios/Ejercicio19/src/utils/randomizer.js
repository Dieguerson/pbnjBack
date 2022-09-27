const crazyNumbers = require("../controllers/randomsController")

process.on('message', (msg) => {
  process.send(crazyNumbers(msg.ammount))
})