const express = require('express');
const { fork } = require('child_process')
const { Router } = express;
let router = new Router();

const forked = fork('../Ejercicio16/src/utils/randomizer.js')

router.get('/randoms', async (req, res) => {
  const ammount = req.query.ammount ?? 100000000

  forked.send({ ammount })
  forked.on('message', msg => {
    const forking = msg
    res.send(forking);
  })
});

module.exports = router;