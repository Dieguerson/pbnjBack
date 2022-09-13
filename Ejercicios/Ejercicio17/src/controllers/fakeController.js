const { faker } = require('@faker-js/faker')

const fakeProds = (ammount = 5) => {
  let fakeArray = []

  if(ammount <= 0 || Number.isNaN(ammount)){
    ammount = 5
  }

  for (let i = 0; i < ammount; i++){
    const title = faker.commerce.product();
    const price = faker.commerce.price();
    const thumbnail = faker.image.imageUrl(640, 480, `${title}`, true);

    fakeArray.push({
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: i + 1
    })
  }

  return fakeArray
}

module.exports = fakeProds