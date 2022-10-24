const { fetchMessages, fetchMessagesByEmail, saveNewMessage } = require('../entities/chat/chatController')

const { Server } = require('socket.io');

const ioConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'https://entrega-final-coder-dieguerson.herokuapp.com/chat',
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', async (socket) => {
    let messages = await fetchMessages()
    let path
    let email

    socket.emit('OpenS', ['Server Escuchando']);
    
    socket.on('OpenC', async (data) => {
      console.info(data[0]);
      path = data[1]
      email= path.split('/')[2]

      if (email) {
        messages = await fetchMessagesByEmail(email)
        messages.sort((a, b) => {
          return a.date - b.date
        })
        socket.emit('messages', messages);
      } else {
        messages = await fetchMessages()
        messages.sort((a, b) => {
          return a.date - b.date
        })
        socket.emit('messages', messages);
      }
    });

    socket.on('newMessage', async (data) => {
      await saveNewMessage(data)

      if (email) {
        messages = await fetchMessagesByEmail(email)
        messages.sort((a, b) => {
          return a.date - b.date
        })
        socket.emit('messages', messages);
      } else {
        messages = await fetchMessages()
        messages.sort((a, b) => {
          return a.date - b.date
        })
        socket.emit('messages', messages);
      }
    });
  });
}

module.exports = ioConnection;