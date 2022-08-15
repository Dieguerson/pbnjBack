const express = require('express');
const app = express()
const crazyNumbers = require('../randomizer')

const cluster = require('cluster')
const os = require('os')
const cpus = os.cpus().length
const pid = process.pid
console.log('Master: ' + cluster.isMaster + ' pid: ' + pid)
console.log(cpus)


if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++){
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${pid}`)
  })
} else {
    app.get('/api/randoms', async (req, res) => {
      const ammount = req.query.cant ?? 100000000
      res.send(crazyNumbers(ammount))
    })
    app.listen(8081, ()=>{  
      console.log('random')
    })
}