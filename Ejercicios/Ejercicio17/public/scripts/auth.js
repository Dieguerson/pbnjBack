const register = document.querySelector('#register')
const userEmail = document.querySelector('#userEmail')
const userPassword = document.querySelector('#userPassword')
const submitRegistration = document.querySelector('#submitRegistration')
const registrationSuccess = document.querySelector('#registrationSuccess')
const registrationError = document.querySelector('#registrationError')

const validateLengths = () => {
  if (userEmail.value.length >= 3 && userPassword.value.length >= 3) {
    submitRegistration.disabled = false
  } else {
    submitRegistration.disabled = true
  }
}

userEmail.addEventListener('input', validateLengths)
userPassword.addEventListener('input', validateLengths)

register.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`/register`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        userEmail: userEmail.value,
        userPassword: userPassword.value
      })
    }
  )
    .then(res => {
      if (res.status === 200) {
        registrationSuccess.innerHTML = `
          <p>El usuario <b>${userEmail.value}</b> ha sido creado</p>
        `
        registrationSuccess.classList.toggle('hidden')
        registrationSuccess.classList.toggle('block')
        register.classList.toggle('hidden')
        register.classList.toggle('flex')
      } else {
        registrationError.innerHTML = `
          <p>El usuario <b>${userEmail.value}</b> ya está registrado</p>
        `
        registrationError.classList.toggle('hidden')
        registrationError.classList.toggle('block')
        setTimeout(()=>{
          registrationError.classList.toggle('hidden')
          registrationError.classList.toggle('flex')
        }, 2000)
      }
    })
    .catch(err => console.error(err))
})

const login = document.querySelector('#login')
const userLogEmail = document.querySelector('#userLogEmail')
const userLogPass = document.querySelector('#userLogPass')
const logStatus = document.querySelector('#logStatus')
let user

login.addEventListener('submit', async (e) => {
  e.preventDefault()
  await fetch(`/login`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userEmail: userLogEmail.value, userPassword: userLogPass.value})
    }
  )
    .then(res => {
      if (res.status === 200) {
        login.classList.toggle('hidden')
        login.classList.toggle('flex')
        logStatus.innerHTML = `
          <div class="border-2 border-blue-800 mb-4 rounded bg-blue-200 p-2 flex items-center">
            <h1 class="text-center font-bold text-2xl">Bienvenide ${userLogEmail.value}</h1>
            <button class="border border-blue-300 rounded-md bg-blue-400 w-fit ml-2 p-1 font-bold text-red-500 hover:shadow-md shadow-orange-400" type="button" onclick="logout()">Salir</button>
          </div>
        `
        logStatus.classList.toggle('hidden')
        logStatus.classList.toggle('block')
      } else {
        logStatus.innerHTML = `
          <div class="border-2 border-red-800 mb-4 rounded bg-red-200 p-2 flex items-center">
            <p class="text-center font-bold text-lg">Error en el mail o la contraseña</p>
          </div>
        `
        logStatus.classList.toggle('hidden')
        logStatus.classList.toggle('block')
        setTimeout(()=>{
          logStatus.classList.toggle('hidden')
          logStatus.classList.toggle('block')
        }, 2000)
      }
    })
    .catch(err => console.error(err))
})

const logout = async () => {
  logStatus.innerHTML = `
      <div class="border-2 border-blue-800 mb-4 rounded bg-blue-200 p-2 flex items-center">
        <h1 class="text-center font-bold text-2xl">Hasta luego ${userLogEmail.value}</h1>
      </div>
    `
  await fetch(`/logout`, {method: 'POST'})
    .catch(err => console.error(err))
  setTimeout(() => {
    location.reload()
  }, 2000)
}
