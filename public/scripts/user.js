const emptyCart = (id) => {
  fetch(`/api/carrito/${id}`, {method: "DELETE"})
  return false
}

const startOrder = (cartId) => {
  fetch(`/usuario/compra/${cartId}`)
}

const deleteProduct = (id, cartId) => {
  fetch(`/api/carrito/${cartId}/productos/${id}`, {method: 'DELETE'})
}

const logout = () => {
  fetch('/salir')
    .then(response => {
      if (response.status === 200) {
        window.location.href = "/"
      }
    })
    .catch(error => console.error(error))
}
