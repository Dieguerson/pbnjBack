class ProductsDto {
  constructor (producto) {
    this.price = producto.price
    this.thumbnail = producto.thumbnail
    this.title = producto.title
  }
}

module.exports = ProductsDto