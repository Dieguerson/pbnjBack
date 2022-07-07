const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const { engine } = require('express-handlebars');

const moment = require('moment');

const { faker } = require('@faker-js/faker')

const Contenedor = require('./ContenedorDB');
const ContenedorFirebase = require('./ContenedorDBFirebase');
const productsDb = new Contenedor('products')
const messageDb = new ContenedorFirebase('messages')

app.use(express.json())

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main.hbs'
}));

const fakeProds = (ammount = 5) => {
  let toReturn = []

  if(ammount <= 0 || Number.isNaN(ammount)){
    ammount = 5
  }

  for (let i = 0; i < ammount; i++){
    const title = faker.commerce.product();
    const price = faker.commerce.price();
    const thumbnail = faker.image.imageUrl(640, 480, `${title}`, true);

    toReturn.push({
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: i + 1
    })
  }

  return toReturn
}

io.on('connection', async (socket) => {
  let gotAll = await productsDb.getAll();
  let gotAllMessages = await messageDb.getAll();
  let fakeIt = fakeProds();
  socket.emit('OpenS', 'Server Escuchando');
  socket.on('OpenC', (data) => {
    console.info(data);
  });
  socket.emit('stock', gotAll);
  socket.on('fakes', () => {
    socket.emit('stock', fakeIt)
  })
  socket.on('addProduct', async(data) => {
    await productsDb.save(data);
    gotAll = await productsDb.getAll();
    io.sockets.emit('stock', gotAll);
  });
  socket.emit('messages', gotAllMessages);
  socket.on('newMessage', async (data) => {
    data.date = moment().format('DD/MM/YYYY, HH:MM:SS');
    await messageDb.save(data);
    gotAllMessages = await messageDb.getAll();
    gotAllMessages.sort((a, b) => {
      return a.result - b.result
    })
    io.sockets.emit('messages', gotAllMessages);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/productos-test', (req, res) => {
  res.render('fakeProds');
});

server.listen(process.env.PORT || 8080, () => {
  console.info('Server Arriba');
});