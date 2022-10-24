class ProductsDto {
  constructor (producto) {
    this._id = producto._id || undefined
    this.name = producto.name
    this.code = Number(producto.code),
    this.category = producto.category,
    this.description = producto.description
    this.thumbnail = producto.thumbnail
    this.price =  Number(producto.price),
    this.stock = Number(producto.stock)
  }
}

module.exports = ProductsDto