const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const { engine } = require('express-handlebars');

const moment = require('moment');

const Contenedor = require('./ContenedorDB');
const ContenedorLite = require('./ContenedorDBLite');
const productsDb = new Contenedor('products')
const messageDb = new ContenedorLite('messages')

app.use(express.json())

/*
// TEST ROUTES
app.get('/product/:id', async (req, res) => {
  res.send(await productsDb.getById(req.params.id))
})
app.get('/message/:id', async (req, res) => {
  res.send(await messageDb.getById(req.params.id))
})
app.put('/product/:id', async (req, res) => {
  res.send(await productsDb.modify(req.params.id, req.body))
})
app.put('/message/:id', async (req, res) => {
  res.send(await messageDb.modify(req.params.id, req.body))
})
app.delete('/product/:id', async (req, res) => {
  res.send(await productsDb.deleteById(req.params.id))
})
app.delete('/message/:id', async (req, res) => {
  res.send(await messageDb.deleteById(req.params.id))
})
app.delete('/product', async (req, res) => {
  res.send(await productsDb.deleteAll())
})
app.delete('/message', async (req, res) => {
  res.send(await messageDb.deleteAll())
})
// END - TEST ROUTES
*//

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main.hbs'
}));

io.on('connection', async (socket) => {
  let gotAll = await productsDb.getAll();
  let gotAllMessages = await messageDb.getAll();
  socket.emit('OpenS', 'Server Escuchando');
  socket.on('OpenC', (data) => {
    console.log(data);
  });
  socket.emit('stock', gotAll);
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
    io.sockets.emit('messages', gotAllMessages);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(process.env.PORT || 8080, () => {
  console.log('Server Arriba');
});