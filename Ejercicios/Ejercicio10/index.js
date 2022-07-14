const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const options = {useNewUrlParser: true, useUnifiedTopology: true}
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
app.use(cookieParser('diega'))
app.use(session(
  {
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://Dieguerson:robot123@robotcluster.bpkbfse.mongodb.net/testingRobots?retryWrites=true&w=majority',
      mongoOptions: options,
      ttl: 600
    }),
    secret: 'Diega',
    resave: true,
    saveUninitialized: true,
  }
))

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

let userSession = ''

io.on('connection', async (socket) => {
  let gotAll = await productsDb.getAll();
  let gotAllMessages = await messageDb.getAll();
  let fakeIt = fakeProds();
  socket.emit('OpenS', 'Server Escuchando');
  socket.on('OpenC', (data) => {
    console.info(data);
  });
  socket.emit('stock', gotAll);
  socket.emit('session', userSession)
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
  userSession = ''
  if (req.session.username){
    console.log(req.session.username)
    userSession = req.session.username
    res.render('index');
  } else {
    res.render('index')
  }
});

app.post('/login', (req, res) => {
  const { username } = req.body
  req.session.username = username
  res.render('index');
})

app.post('/logout', (req, res) => {
  req.session.destroy()
  res.send();
})

app.get('/api/productos-test', (req, res) => {
  res.render('fakeProds');
});

server.listen(process.env.PORT || 8080, () => {
  console.info('Server Arriba');
});