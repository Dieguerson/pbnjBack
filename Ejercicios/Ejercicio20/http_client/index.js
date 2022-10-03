const axios = require('axios')

const requestGet = async () => {
  let toReturn
  await axios.get('http://localhost:8080/api/productos')
    .then(res => {
      toReturn = res.data
    })
    .catch(err => console.log(err))
  return toReturn
}

const requestPost = async (product) => {
  let toReturn
  await axios.post('http://localhost:8080/api/productos', {product})
    .then(res => {
      toReturn = res.data
    })
    .catch(err => console.log(err))
  return toReturn
}

const requestPut = async (modification, id) => {
  let toReturn
    await axios.put('http://localhost:8080/api/productos', {data: modification}, {params: {id: id}})
    .then(res => {
      toReturn = res.data
    })
    .catch(err => console.log(err))
  return toReturn
}

const requestDelete = async (id) => {
  let toReturn
    await axios.delete('http://localhost:8080/api/productos', {params: {id: id}})
    .then(res => {
      toReturn = res.data
    })
    .catch(err => console.log(err))
  return toReturn
}

module.exports = { requestGet, requestPost, requestPut, requestDelete }