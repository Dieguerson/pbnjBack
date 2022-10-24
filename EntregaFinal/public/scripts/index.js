const login = document.querySelector('#login')
const userLoginInputs = {
  userLogEmail: document.querySelector('#userLogEmail'),
  userLogPass: document.querySelector('#userLogPass')
}
const submitLogin = document.querySelector('#submitLogin')

const enableLogin = () => {
  const userMinimumData = userLoginInputs.userLogPass.value.length >= 3 && !!userLoginInputs.userLogEmail
  userMinimumData ? submitLogin.disabled = false : submitLogin.disabled = true
}

for (let input in userLoginInputs) {
  userLoginInputs[input].addEventListener('input', enableLogin)
}

login.addEventListener('submit', async (event) => {
  event.preventDefault()

  const userLogEmail = userLoginInputs.userLogEmail.value
  const userLogPass = userLoginInputs.userLogPass.value

  const userLogin = {
    userLogEmail,
    userLogPass
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
            <p>El usuario <b>${userLoginInputs.userLogEmail.value}</b> ha ingresado!</p>
          `
          logSuccess.classList.toggle('hidden')
          logSuccess.classList.toggle('block')
  
          window.location.href = `/productos`
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
    console.error(error)
  }
})

const signIn = document.querySelector('#signIn')
const userSignInInputs = {
  userSignInName: document.querySelector('#userSignInName'),
  userSignInAddress: document.querySelector('#userSignInAddress'),
  userSignInAge: document.querySelector('#userSignInAge'),
  userSignInEmail: document.querySelector('#userSignInEmail'),
  userSignInPhone: document.querySelector('#userSignInPhone'),
  userSignInAvatar: document.querySelector('#userSignInAvatar'),
  userSignInRol: document.querySelector('#userSignInRol'),
  userSignInPass: document.querySelector('#userSignInPass'),
  userSignInRepeatPass: document.querySelector('#userSignInRepeatPass')
}
const submitSignIn = document.querySelector('#submitSignIn')

const enableSignIn = () => {
  const userSignInPhone = userSignInInputs.userSignInPhone.value
  const userMinimumData = userSignInInputs.userSignInName.value.length >= 3 && userSignInInputs.userSignInPass.value.length >= 3 && !!userSignInInputs.userSignInEmail
  const phoneBreaker = userSignInPhone.split('')
  const phoneValidator = userSignInPhone.length === 13 && phoneBreaker[0] === '+' && phoneBreaker[1] === '5' && phoneBreaker[2] === '4'
  const passValidator = userSignInPass.value > 0 && userSignInPass.value === userSignInRepeatPass.value
  if (phoneValidator) {
    const phoneValidation = document.querySelector('#phoneValidation')
    phoneValidation.classList.remove('text-red-500')
    phoneValidation.classList.add('text-green-500')
  } else {
    const phoneValidation = document.querySelector('#phoneValidation')
    phoneValidation.classList.add('text-red-500')
    phoneValidation.classList.remove('text-green-500')
  }
  if (passValidator) {
    const passValidation = document.querySelector('#passValidation')
    passValidation.classList.remove('text-red-500')
    passValidation.classList.add('text-green-500')
  } else {
    const passValidation = document.querySelector('#passValidation')
    passValidation.classList.add('text-red-500')
    passValidation.classList.remove('text-green-500')
  }

  userMinimumData && phoneValidator && passValidator ? submitSignIn.disabled = false : submitSignIn.disabled = true
}

for (let input in userSignInInputs) {
  userSignInInputs[input].addEventListener('input', enableSignIn)
}

signIn.addEventListener('submit', (event) => {
  event.preventDefault()
  const avatar = userSignInInputs.userSignInAvatar.files[0]
  const fullType = avatar.type
  const simpleType = fullType.split('/')[0]
  if (simpleType === 'image') {
    const userForm = new FormData()
    userForm.append('userName', userSignInInputs.userSignInName.value)
    userForm.append('userAddress', userSignInInputs.userSignInAddress.value)
    userForm.append('userAge', userSignInInputs.userSignInAge.value)
    userForm.append('userEmail', userSignInInputs.userSignInEmail.value)
    userForm.append('userPhone', userSignInInputs.userSignInPhone.value)
    userForm.append('userPass', userSignInInputs.userSignInPass.value)
    userForm.append('avatar', avatar)
    userForm.append('admin', userSignInInputs.userSignInRol.value)
    try {
      fetch(`/registro`, {
        method: 'POST',
        headers: {'Content-Disposition':'application/json'},
        body: userForm
      })
        .then(response => {
          if (response.status === 200) {
            const signInSuccess = document.querySelector('#signInSuccess')
            signInSuccess.innerHTML = `
              <p>El usuario <b>${userSignInInputs.userSignInName.value}</b> ha sido creado!</p>
            `
            signInSuccess.classList.toggle('hidden')
            signInSuccess.classList.toggle('block')
          } else {
            const signInError = document.querySelector('#signInError')
            signInError.innerHTML = `
              <p>El usuario <b>${userSignInInputs.userSignInName.value}</b> ya está registrado</p>
            `
            signInError.classList.toggle('hidden')
            signInError.classList.toggle('block')
            setTimeout(()=>{
              signInError.classList.toggle('hidden')
              signInError.classList.toggle('flex')
            }, 2000)
          }
        })
    } catch (error){
      console.error(error)
    }
  }
})