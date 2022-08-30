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
    .then(res => {
      if (res.status === 200) {
        window.location.href = "/"
      }
    })
    .catch(err => console.log(err))
}