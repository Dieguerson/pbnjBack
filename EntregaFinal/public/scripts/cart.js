const emptyCart = (id) => {
  fetch(`/carrito/${id}`, {method: "DELETE"})
  return false
}

const startOrder = (cartId) => {
  fetch('/orden', {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({cartId})
  })
}

const deleteProduct = (id, cartId) => {
  fetch(`/carrito/${cartId}/productos/${id}`, {method: 'DELETE'})
}