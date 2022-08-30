const logForm = document.querySelector('#logForm')
const userInputs = {
  userEmail: document.querySelector('#userEmail'),
  userPass: document.querySelector('#userPass')
}
const submit = document.querySelector('#submit')

const enableLogin = () => {
  const userMinimumData = userInputs.userPass.value.length >= 3 && !!userInputs.userEmail
  userMinimumData ? submit.disabled = false : submit.disabled = true
}

for (let input in userInputs) {
  userInputs[input].addEventListener('input', enableLogin)
}

logForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const userEmail = userInputs.userEmail.value
  const userPass = userInputs.userPass.value

  const userLogin = {
    userEmail,
    userPass
  }

  try {
    await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userLogin)
    })
      .then(response => {
        if (response.status === 200) {
          const logSuccess = document.querySelector('#logSuccess')
          logSuccess.innerHTML = `
            <p>El usuario <b>${userInputs.userEmail.value}</b> ha ingresponseado!</p>
          `
          logSuccess.classList.toggle('hidden')
          logSuccess.classList.toggle('block')
  
          window.location.href = `usuario/${userLogin.userEmail}`
        } else {
          const logError = document.querySelector('#logError')
          logError.innerHTML = `
            <p>El usuario o la contraseña son incorrectos.</p>
          `
          logError.classList.toggle('hidden')
          logError.classList.toggle('block')

          setTimeout(()=>{
            logError.classList.toggle('hidden')
            logError.classList.toggle('flex')
          }, 2000)
        }
      })
  } catch(error) {
    console.error(err)
  }
})