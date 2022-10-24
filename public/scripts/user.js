const logout = () => {
  fetch('/salir')
    .then(response => {
      if (response.status === 200) {
        window.location.href = "/"
      }
    })
    .catch(error => console.error(error))
}