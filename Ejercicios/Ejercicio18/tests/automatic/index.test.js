const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
const getProduct = require('../generator/products')

const fakeProduct = getProduct()

describe('Products CRUD Test', () => {
  describe('GET all products', () => {
    it('Request for Products List should return status of 200', async () => {
      let response = await request.get('/api/productos')
      expect(response.status).to.eql(200)
    })
  })
  
  describe('POST new product', () => {
    it('Last entry in products list should be the same as sent data', async () => {
      let response = await request.post('/api/productos').send({product: fakeProduct})
      expect(response.body[response.body.length-1]).to.eql(fakeProduct)
    })
  })
  
  describe('Modify product via PUT', () => {
    it('Last entry in products list should show empty thumbnail', async () => {
      let response = await request.put('/api/productos').query({id: 3}).send({data: {thumbnail: ''}})
      expect(response.body[response.body.length-1].thumbnail).to.eql('')
    })
  })
  
  describe('DELETE product', () => {
    it('Last entry in products list should be different than POST data', async () => {
      let response = await request.delete('/api/productos').query({id: 3})
      expect(response.body[response.body.length-1]).to.not.eql(fakeProduct)
    })
  })
})