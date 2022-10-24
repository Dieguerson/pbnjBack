const path = window.location.pathname

let db = [];

socket.on('OpenS', (data) => {
  socket.emit('OpenC', ['Client Escuchando', path]);
  console.info(data[0]);
});

const mailSelect = document.querySelector('#mailSelect')

const mRender = (messages) => {
  let template = '';
  if (messages.length === 0) {
    document.querySelector('#messageErrorContainer').className = 'block hover:shadow-lg shadow-orange-400 p-4 flex flex-col items-center border-2 border-blue-500 bg-blue-500/20 col-span-2';
    document.querySelector('#messageListContainer').className = 'hidden hover:shadow-lg shadow-orange-400 flex flex-col items-center justify-center';
  } else {
    messages.forEach((message) => {
      const name = message.type === 'usuario' ? message.email : `Administrador a ${message.email}` 
      template += `
        <p class="font-bold text-lg">${name} <span class="text-sm font-base text-blue-500">[${message.date}]</span>:</p>
        <p class="font-semibold text-md text-gray-700 italic w-fit mx-4">${message.body}</p>
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
  db = data
  mRender(data);
  if (!!mailSelect) {
    let options
    let list = []
    db.forEach(message => {
      const exists = list.find(email => email === message.email)
      if (exists) {
        return
      }
      list.push(message.email)
      options += `
        <option value="${message.email}">${message.email}</option>
      `
    })
    mailSelect.innerHTML = options
  }
});

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
  const email = document.querySelector('#mail')?.value || document.querySelector('#mailSelect')?.value
  const type = !!mailSelect ? 'sistema' : 'usuario'
  const body = document.querySelector('#message').value
  const message = {
    email,
    type,
    body,
  };
  document.querySelector('#message').value = '';
  socket.emit('newMessage', message);
});