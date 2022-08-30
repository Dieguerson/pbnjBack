const signInForm = document.querySelector('#signInForm')
const userInputs = {
  userName: document.querySelector('#userName'),
  userAddress: document.querySelector('#userAddress'),
  userAge: document.querySelector('#userAge'),
  userEmail: document.querySelector('#userEmail'),
  userPhone: document.querySelector('#userPhone'),
  userAvatar: document.querySelector('#userAvatar'),
  userPass: document.querySelector('#userPass')
}
const submit = document.querySelector('#submit')

const enableSignIn = () => {
  const userMinimumData = userInputs.userName.value.length >= 3 && userInputs.userPass.value.length >= 3 && !!userInputs.userEmail
  userMinimumData ? submit.disabled = false : submit.disabled = true
}

for (let input in userInputs) {
  userInputs[input].addEventListener('input', enableSignIn)
}

signInForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const avatar = userInputs.userAvatar.files[0]
  const fullType = avatar.type
  const simpleType = fullType.split('/')[0]
  if (simpleType === 'image') {
    const userForm = new FormData()
    userForm.append('userName', userInputs.userName.value)
    userForm.append('userAddress', userInputs.userAddress.value)
    userForm.append('userAge', userInputs.userAge.value)
    userForm.append('userEmail', userInputs.userEmail.value)
    userForm.append('userPhone', userInputs.userPhone.value)
    userForm.append('userPass', userInputs.userPass.value)
    userForm.append('avatar', avatar)
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
              <p>El usuario <b>${userInputs.userName.value}</b> ha sido creado!</p>
            `
            signInSuccess.classList.toggle('hidden')
            signInSuccess.classList.toggle('block')
          } else {
            const signInError = document.querySelector('#signInError')
            signInError.innerHTML = `
              <p>El usuario <b>${userInputs.userName.value}</b> ya está registrado</p>
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