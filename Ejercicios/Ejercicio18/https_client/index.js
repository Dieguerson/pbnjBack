const axios = require('axios')

axios.get('http://localhost:8080/api/productos')
  .then(res => {
    console.log(res.data)
  })