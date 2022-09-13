const socket = io();
let db = [];

const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
const messageSchema = new normalizr.schema.Entity('message', {
  author: authorSchema
}, {idAttribute: 'innerId'})

socket.on('OpenS', (data) => {
  socket.emit('OpenC', 'Client Escuchando');
  console.info(data[0]);
});

const pRender = (products) => {
  console.log(products)
  let template = '';

  if (products.length === 0) {
    document.querySelector('#errorContainer').className = 'block hover:shadow-lg shadow-orange-400 p-4 flex flex-col items-center border-2 border-blue-500 bg-blue-500/20 col-span-2';
    document.querySelector('#listContainer').className = 'hidden hover:shadow-lg shadow-orange-400 flex flex-col items-center';
  } else {

    products.forEach((product) => {
    template += `
      <tr class="w-fit border-2 border-blue-500">
        <td class="border-2 border-blue-500 px-2">${product.title}</td>
        <td class="border-2 border-blue-500 px-2 text-center">$${product.price}</td>
        <td class="w-[75px] flex border-1 border-blue-500 p-2 justify-center box-border"><img class="h-10" src=${product.thumbnail} alt={{this.name}}></td>
      </tr>
    `
    });
    if (document.querySelector('#list')) {
      document.querySelector('#list').innerHTML = template;
      document.querySelector('#errorContainer').className = 'hidden hover:shadow-lg shadow-orange-400 p-4 flex flex-col items-center border-2 border-blue-500 bg-blue-500/20 col-span-2';
      document.querySelector('#listContainer').className = 'block hover:shadow-lg shadow-orange-400 flex flex-col items-center';
    }
  }
};

socket.on('stock', (data) => {
  pRender(data);
});

const mRender = (normalizedMessages) => {
  let messages = []
  
  normalizedMessages.forEach(msg => {
    const abnormalMessage = normalizr.denormalize(msg.result, messageSchema, msg.entities)
    messages.push(abnormalMessage)
  })

  const normalSize = JSON.stringify(normalizedMessages).length
  const abnormalSize = JSON.stringify(messages).length
  const compressionRate = (100 - (abnormalSize * 100) / normalSize).toFixed(2)
  
  let template = '';
  if (messages.length === 0) {
    document.querySelector('#messageErrorContainer').className = 'block hover:shadow-lg shadow-orange-400 p-4 flex flex-col items-center border-2 border-blue-500 bg-blue-500/20 col-span-2';
    document.querySelector('#messageListContainer').className = 'hidden hover:shadow-lg shadow-orange-400 flex flex-col items-center';
  } else {
    template += `
      <div class="border-2 border-blue-800 mb-4 rounded bg-blue-200">
        <h1 class="text-center font-bold text-2xl">${compressionRate}% de Compresión</h1>
        <p class="font-bold text-lg text-center">Tamaño Normalizado: ${normalSize}kB</p>
        <p class="font-bold text-lg text-center">Tamaño Desnormalizado: ${abnormalSize}kB</p>
      </div>
      `
    messages.forEach((message) => {
      template += `
        <img src="${message.author.avatar}" alt="${message.author.name} ${message.author.lastname}" class="w-20 h-20 mx-auto"/>
        <p class="font-bold text-lg">${message.author.email} <span class="text-sm font-base text-blue-500">[${message.date}]</span>:</p>
        <p class="font-semibold text-md text-gray-700 italic">${message.text}</p>
      `
    });
    if (document.querySelector('#messageList')){
      document.querySelector('#messageList').innerHTML = template;
      document.querySelector('#messageErrorContainer').className = 'hidden hover:shadow-lg shadow-orange-400 p-4 flex flex-col items-center border-2 border-blue-500 bg-blue-500/20 col-span-2';
      document.querySelector('#messageListContainer').className = 'block hover:shadow-lg shadow-orange-400 flex flex-col items-center';
    }
  }
}

socket.on('messages', (data) => {
  mRender(data);
});

const addProduct = () => {
  const newProduct = {
    title: document.querySelector('#title').value,
    price: document.querySelector('#price').value,
    thumbnail: document.querySelector('#thumbnail').value
  };
  document.querySelector('#title').value = '';
  document.querySelector('#price').value = '';
  document.querySelector('#thumbnail').value = '';
  socket.emit('addProduct', newProduct);
  return false;
};

const validMail = () => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z-]/;
  const mail = document.querySelector('#mail').value;
  if (mail.match(validRegex)) {
    document.querySelector('#message').disabled = false;
  } else {
    document.querySelector('#message').disabled = true;
  }
};

const messageExists = () => {
  const message = document.querySelector('#message').value;
  if (message.length >= 6) {
    document.querySelector('#sendMessage').disabled = false;
  } else {
    document.querySelector('#sendMessage').disabled = true;
  }
};

document.querySelector('#sendMessage')?.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('#mail').value
  const name = document.querySelector('#name').value
  const lastname = document.querySelector('#lastname').value
  const age = document.querySelector('#age').value
  const alias = document.querySelector('#alias').value
  const avatar = document.querySelector('#avatar').value
  const text = document.querySelector('#message').value
  const message = {
    author: {
      email,
      name,
      lastname,
      age,
      alias,
      avatar
    },
    text
  };
  document.querySelector('#message').value = '';
  socket.emit('newMessage', message);
});