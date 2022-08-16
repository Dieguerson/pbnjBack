const express = require('express');
// const { fork } = require('child_process')
const { Router } = express;
let router = new Router();

// const forked = fork('./randomizer.js')

const crazyNumbers = (ammount) => {
  const orderedCrazy = {};

  for (let i = 1; i <= ammount; i++) {
    const random = Math.floor(Math.random() * 1000)

    if (orderedCrazy[random] === 1) {
      orderedCrazy[random] += 1
    } else {
      orderedCrazy[random] = 1
    }

    if (i === ammount) {
      orderedCrazy.calculos = `${i} números randomizados`
    }
  }

  return orderedCrazy
}

router.get('/randoms', async (req, res) => {
  const ammount = req.query.cant ?? 100000000
  res.send(crazyNumbers(ammount));
});

module.exports = router;