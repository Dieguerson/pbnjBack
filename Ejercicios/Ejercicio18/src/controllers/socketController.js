const { fetchProducts, fetchMessages, saveNewProduct, saveNewMessage } = require('../controllers/homeController');

const { Server } = require('socket.io');

const ioConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'https://pbnjback.herokuapp.com/',
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', async (socket) => {
    let products = await fetchProducts()
    let messages = await fetchMessages()

    socket.emit('OpenS', ['Server Escuchando']);
    
    socket.on('OpenC', (data) => {
      console.info(data);
    });

    socket.emit('stock', products);
    socket.on('addProduct', async(data) => {
      await saveNewProduct(data)
      products = await fetchProducts()
      io.sockets.emit('stock', products);
    });

    socket.emit('messages', messages);
    socket.on('newMessage', async (data) => {
      await saveNewMessage(data)
      messages = await fetchMessages()
      messages.sort((a, b) => {
        return a.innerId - b.innerId
      })
      io.sockets.emit('messages', messages);
    });
  });
}

module.exports = ioConnection;