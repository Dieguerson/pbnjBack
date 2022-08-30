let pokeDb;

try {
  fetch('/api/productos')
  .then(response => response.json())
    .then(data => {
      pokeDb = data;
      const products = document.querySelector("#products")
      let newPoke = ""
      data.forEach(poke => {
        newPoke += `
          <div class="border-2 border-black rounded flex flex-col items-center p-2">
            <h3 class="text-xl font-bold capitalize">${poke.name}</h3>
            <img class="w-10 h-10" src="${poke.thumbnail}" alt="${poke.name}">
            <p><b>Price:</b> $${poke.price}</p>
            <p><b>Stock:</b> ${poke.stock}</p>
            <p><b>ID del Producto:</b> ${poke._id}</p>
            <button disabled class="mb-2 bg-blue-200 text-black rounded shadow-sm w-auto p-1 mt-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed admin-btn" onclick="killPoke(${"'" + poke._id + "'"})">Eliminar</button>
            <button disabled class="mb-2 bg-red-200 text-black rounded shadow-sm w-auto p-1 mt-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed admin-btn" onclick="updatePoke(${"'" + poke._id + "'"})">Actualizar</button>
            <button class="mb-2 bg-red-200 text-black rounded shadow-sm w-auto p-1 mt-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed admin-btn" onclick="addToCart(${"'" + poke._id + "'"})">Añadir a Carrito</button>
          </div>
        `
      })
      products.innerHTML = newPoke
    })
} catch (error) {
  console.error(error)
}

    
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

  const adminFakeIn = document.querySelector("#adminFakeIn");
  const adminFakeOut = document.querySelector("#adminFakeOut");

  adminFakeIn.classList.toggle("hidden");
  adminFakeIn.classList.toggle("block");
  adminFakeOut.classList.toggle("hidden");
  adminFakeOut.classList.toggle("block");
}

const killPoke = (id) => {
  fetch(`/api/productos/admin/${id}`, {method: "DELETE"})
}

let externalId

const updatePoke = (id) => {
  const toModify = pokeDb.find(poke => poke._id === id)
  externalId = id

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

document.querySelector('#update').addEventListener('click', (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value
  const code = document.querySelector("#code").value
  const description = document.querySelector("#description").value
  const thumbnail = document.querySelector("#thumbnail").value
  const price = document.querySelector("#price").value
  const stock = document.querySelector("#stock").value
  const toModify = pokeDb.find(poke => poke._id === externalId)
  const obj = {name: name, code: code, description: description, thumbnail: thumbnail, price: price, stock: stock}
  fetch(`api/productos/admin/${toModify._id}`, {method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(obj) })
})

const addToCart = (id) => {
  fetch('/api/carrito/productos', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({id})
  })
}