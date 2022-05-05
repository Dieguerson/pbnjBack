const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { engine } = require('express-handlebars');

const { Server } = require('socket.io');
const io = new Server(server);

const moment = require('moment');

app.use(express.static(__dirname + '/public/'));

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main.hbs'
}));

const Contenedor = require('./Contenedor.js');
const db = new Contenedor('productos.txt');
const messageDb = new Contenedor('mensajes.txt');

io.on('connection', async (socket) => {
  let gotAll = await db.getAll();
  let gotAllMessages = await messageDb.getAll();
  socket.emit('OpenS', 'Server Escuchando');
  socket.on('OpenC', (data) => {
    console.log(data);
  });
  socket.emit('stock', gotAll);
  socket.on('addProduct', async(data) => {
    await db.save(data);
    gotAll = await db.getAll();
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