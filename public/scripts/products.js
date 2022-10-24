let externalId

if (!!document.querySelector('#form'))  {
  document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value
    const code = document.querySelector("#code").value
    const category = document.querySelector("#category").value
    const description = document.querySelector("#description").value
    const thumbnail = document.querySelector("#thumbnail").value
    const price = document.querySelector("#price").value
    const stock = document.querySelector("#stock").value
    const obj = {
      newItem: {
        name: name,
        code: Number(code),
        category: category,
        description: description,
        thumbnail: thumbnail,
        price: Number(price),
        stock: Number(stock)
      }
    }
    fetch(`/api/productos/admin`, {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(obj) })
      .then(res => {
        if (res.status === 200) {
          location.reload()
        }
      })
  })
  
  document.querySelector('#update').addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value
    const code = document.querySelector("#code").value
    const category = document.querySelector("#category").value
    const description = document.querySelector("#description").value
    const thumbnail = document.querySelector("#thumbnail").value
    const price = document.querySelector("#price").value
    const stock = document.querySelector("#stock").value
    const obj = {
      modifiedItem: {
        name: name,
        code: Number(code),
        category:  category,
        description: description,
        thumbnail: thumbnail,
        price: Number(price),
        stock: Number(stock)
      }
    }
    fetch(`api/productos/admin/${externalId}`, {method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(obj) })
      .then(res => {
        if (res.status === 200) {
          location.reload()
        }
      })
  })
}

const killPoke = (id) => {
  fetch(`/api/productos/admin/${id}`, {method: "DELETE"})
    .then(res => {
      if (res.status === 200) {
        location.reload()
      }
    })
}

const updatePoke = async (id) => {
  let toModify

  await fetch(`/producto/${id}`)
    .then(response => response.json())
    .then(data => {
      toModify = data
    })

  externalId = id

  document.querySelector("#name").value = toModify.name
  document.querySelector("#code").value = toModify.code
  document.querySelector("#category").value = toModify.category
  document.querySelector("#description").value = toModify.description
  document.querySelector("#thumbnail").value = toModify.thumbnail
  document.querySelector("#price").value = toModify.price
  document.querySelector("#stock").value = toModify.stock
  document.querySelector("#submit").classList.toggle("block")
  document.querySelector("#submit").classList.toggle("hidden")
  document.querySelector("#update").classList.toggle("block")
  document.querySelector("#update").classList.toggle("hidden")
}


const addToCart = (id) => {
  const ammount = document.querySelector(`#${"ammount" + String(id)}`).value

  if (ammount > 0) {
    fetch('/carrito/productos', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({id, ammount})
    })
  }
}

const subtract = (id) => {
  const ammount = document.querySelector(`#${"ammount" + String(id)}`)
  const oldAmmount = Number(ammount.value)
  const newAmmount = oldAmmount - 1
  if (newAmmount <= 0) {
    ammount.value = 0
  } else {
    ammount.value = newAmmount
  }
}

const stockProcesser = (id) => {
  const source = document.querySelector(`#${'maxAmmount' + String(id)}`).innerHTML
  const sourceSplitter = source.split(' ')

  return Number(sourceSplitter[1])
}

const add = (id) => {
  const ammount = document.querySelector(`#${"ammount" + String(id)}`)
  const stock = stockProcesser(id)
  const oldAmmount = Number(ammount.value)
  const newAmmount = oldAmmount + 1
  if (newAmmount >= stock) {
    ammount.value = stock
  } else {
    ammount.value = newAmmount
  }
}