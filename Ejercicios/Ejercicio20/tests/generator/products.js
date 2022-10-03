const { faker } = require('@faker-js/faker')

const getProduct = () => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(640, 480, true),
  }
}

module.exports = getProduct