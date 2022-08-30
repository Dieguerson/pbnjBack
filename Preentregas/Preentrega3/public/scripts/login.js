const loginForm = document.querySelector('#login')
const userInputs = {
  userEmail: document.querySelector('#email'),
  userPass: document.querySelector('#password')
}
const login = document.querySelector('#submit')

const enable = () => {
  const userMinimumData = userInputs.userPass.value.length >= 3 && !!userInputs.userEmail
  userMinimumData ? login.disabled = false : login.disabled = true
}

for (let input in userInputs) {
  userInputs[input].addEventListener('input', enable)
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const userLogin = {
    userEmail: userInputs.userEmail.value,
    userPass: userInputs.userPass.value
  }
  await fetch('/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userLogin)
  })
    .then(res => {
      if (res.status === 200) {
        const userLogged = document.querySelector('#logged')
        userLogged.innerHTML = `
          <p>El usuario <b>${userInputs.userEmail.value}</b> ha ingresado!</p>
        `
        userLogged.classList.toggle('hidden')
        userLogged.classList.toggle('block')

        window.location.href = `user/${userLogin.userEmail}`
      } else {
        const logError = document.querySelector('#error')
        logError.innerHTML = `
          <p>El usuario <b>${userInputs.userEmail.value}</b> no puede ingresar.</p>
        `
        logError.classList.toggle('hidden')
        logError.classList.toggle('block')
        setTimeout(()=>{
          logError.classList.toggle('hidden')
          logError.classList.toggle('flex')
        }, 2000)
      }
    })
    .catch(err => console.error(err))
})