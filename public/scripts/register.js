const newUserForm = document.querySelector('#signIn')
const userInputs = {
  userName: document.querySelector('#userName'),
  userAddress: document.querySelector('#address'),
  userAge: document.querySelector('#age'),
  userEmail: document.querySelector('#email'),
  userPhone: document.querySelector('#phone'),
  userAvatar: document.querySelector('#avatar'),
  userPass: document.querySelector('#password')
}
const create = document.querySelector('#create')

const enable = () => {
  const userMinimumData = userInputs.userName.value.length >= 3 && userInputs.userPass.value.length >= 3 && !!userInputs.userEmail
  userMinimumData ? create.disabled = false : create.disabled = true
}

for (let input in userInputs) {
  userInputs[input].addEventListener('input', enable)
}

newUserForm.addEventListener('submit', (e) => {
  e.preventDefault()
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
    // Creación de carrito
    fetch(`/register`, {
      method: 'POST',
      headers: {'Content-Disposition':'application/json'},
      body: userForm
    })
      .then(res => {
        if (res.status === 200) {
          const userCreated = document.querySelector('#created')
          userCreated.innerHTML = `
            <p>El usuario <b>${userInputs.userName.value}</b> ha sido creado</p>
          `
          userCreated.classList.toggle('hidden')
          userCreated.classList.toggle('block')
        } else {
          const userExists = document.querySelector('#error')
          userExists.innerHTML = `
            <p>El usuario <b>${userInputs.userName.value}</b> ya está registrado</p>
          `
          userExists.classList.toggle('hidden')
          userExists.classList.toggle('block')
          setTimeout(()=>{
            userExists.classList.toggle('hidden')
            userExists.classList.toggle('flex')
          }, 2000)
        }
      })
      .catch(err => console.error(err))
  }
})