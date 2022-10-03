const { requestGet, requestPost, requestPut, requestDelete } = require('../../http_client/index')
const getProduct = require('../generator/products')

const fakeProd = getProduct()

const manualTest = async () => {
  console.log ('INITIAL DATA', await requestGet())
  console.log ('ADD PRODUCT', await requestPost(fakeProd))
  console.log ('MODIFY PRODUCT', await requestPut({thumbnail: ''}, 3))
  console.log ('DELETE PRODUCT', await requestDelete(3))
}

manualTest()