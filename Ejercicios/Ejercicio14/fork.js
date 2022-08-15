process.on('message', (msg) => {
  process.send(crazyNumbers(msg.ammount))
})


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

module.exports = crazyNumbers
