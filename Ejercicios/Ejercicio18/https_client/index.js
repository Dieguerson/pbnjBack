const axios = require('axios')
const { faker } = require('@faker-js/faker')

const fakeProd = {
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.imageUrl(640, 480, true),
}


axios.get('http://localhost:8080/api/productos')
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))

axios.post('http://localhost:8080/api/productos', {fakeProd})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))