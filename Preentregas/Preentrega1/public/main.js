let pokeDb;

fetch('/api/productos')
  .then(res => res.json())
    .then(data => {
      pokeDb = data;
      console.log('db', pokeDb)
      const list = document.querySelector("#products")
      let newPoke = ""
      console.log(list)
      data.forEach(poke => {
        newPoke += `
          <div class="border-2 border-black rounded flex flex-col items-center p-2">
            <h3 class="text-xl font-bold">${poke.name}</h3>
            <img class="w-10 h-10" src="${poke.thumbnail}" alt="${poke.name}">
            <p><b>Price:</b> $${poke.price}</p>
            <p><b>Stock:</b> ${poke.stock}</p>
            <p><b>ID del Producto:</b> ${poke.id}</p>
            <button disabled class="mb-2 bg-blue-200 text-black rounded shadow-sm w-auto p-1 mt-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed admin-btn" onclick="killPoke(${poke.id})">Eliminar</button>
            <button disabled class="mb-2 bg-red-200 text-black rounded shadow-sm w-auto p-1 mt-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed admin-btn" onclick="updatePoke(${poke.id})">Actualizar</button>
          </div>
        `
      })
      list.innerHTML = newPoke
      console.log(data)
    })
    
const administrate = () => {
  document.querySelector("#name").disabled = !document.querySelector("#name").disabled
  document.querySelector("#description").disabled = !document.querySelector("#description").disabled
  document.querySelector("#code").disabled = !document.querySelector("#code").disabled
  document.querySelector("#thumbnail").disabled = !document.querySelector("#thumbnail").disabled
  document.querySelector("#price").disabled = !document.querySelector("#price").disabled
  document.querySelector("#stock").disabled = !document.querySelector("#stock").disabled
  document.querySelector("#submit").disabled = !document.querySelector("#submit").disabled
  const buttonList = document.querySelectorAll(".admin-btn")
  buttonList.forEach(button => {
    button.disabled = !button.disabled
  })

  const login = document.querySelector("#login");
  const logout = document.querySelector("#logout");

  login.classList.toggle("hidden");
  login.classList.toggle("block");
  logout.classList.toggle("hidden");
  logout.classList.toggle("block");
}

const killPoke = (id) => {
  fetch(`/api/productos/admin/${id}`, {method: "DELETE"})
}

const updatePoke = (id) => {
  const toModify = pokeDb.find(poke => poke.id === id)

  document.querySelector("#name").value = toModify.name
  document.querySelector("#code").value = toModify.code
  document.querySelector("#description").value = toModify.description
  document.querySelector("#thumbnail").value = toModify.thumbnail
  document.querySelector("#price").value = toModify.price
  document.querySelector("#stock").value = toModify.stock
  document.querySelector("#submit").classList.toggle("block")
  document.querySelector("#submit").classList.toggle("hidden")
  document.querySelector("#update").classList.toggle("block")
  document.querySelector("#update").classList.toggle("hidden")
}

document.querySelector('#update').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value
  const code = document.querySelector("#code").value
  const description = document.querySelector("#description").value
  const thumbnail = document.querySelector("#thumbnail").value
  const price = document.querySelector("#price").value
  const stock = document.querySelector("#stock").value
  const toModify = pokeDb.find(poke => poke.code === Number(code))
  const obj = {name: name, code: code, description: description, thumbnail: thumbnail, price: price, stock: stock}
  console.log(name, code, description, thumbnail, price, stock)
  console.log(obj)
  fetch(`api/productos/admin/${toModify.id}`, {method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(obj) })
})

document.querySelector('#cartDelete').addEventListener('submit', (e) => {
  e.preventDefault();
  const deleteId = document.querySelector("#deleteId").value
  fetch(`/api/carrito/${deleteId}`, {method: "DELETE"})
})

document.querySelector('#cartSearch').addEventListener('submit', (e) => {
  e.preventDefault();
  const searchId = document.querySelector("#searchId").value
  fetch(`/api/carrito/${searchId}/productos`)
  .then(res => res.json())
    .then(data => {
      const list = document.querySelector("#cartProducts")
      let newProduct = ""
      data.forEach(product => {
        newProduct += `
          <div class="border-2 border-black rounded flex flex-col items-center">
            <h3 class="text-xl font-bold">${product.name}</h3>
            <img class="w-10 h-10" src="${product.thumbnail}" alt="${product.name}">
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Stock:</b> ${product.stock}</p>
            <button class="mb-2 bg-blue-200 text-black rounded shadow-sm w-auto p-1 mt-2 cart-btn" onclick="killProduct(${product.id}, ${searchId})">Eliminar</button>
          </div>
        `
      })
      list.innerHTML = newProduct
      list.classList.toggle("block")
      list.classList.toggle("hidden")
    })
})

const killProduct = (id, cartId) => {
  fetch(`api/carrito/${cartId}/productos/${id}`, {method: 'DELETE'})
}