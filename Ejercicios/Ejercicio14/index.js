require('dotenv').config()
const yargs = require('yargs/yargs')
const args = process.argv.slice(2)
const yargedArgs = yargs(args).default({ PORT: 8080 }).alias({ p: 'PORT' }).argv
const { PORT } = yargedArgs
const logger = require('./logger')

const express = require('express');
const randoms = require('./routes/randoms');
const compression = require('compression')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const User = require('./models/User')
const app = express();
const bcrypt = require('bcrypt')
const passport = require('./passport')
const flash = require('connect-flash')

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const { engine } = require('express-handlebars');

const moment = require('moment');

const { faker } = require('@faker-js/faker')

const Contenedor = require('./ContenedorDB');
const ContenedorFirebase = require('./ContenedorDBFirebase');
const ContenedorMongo = require('./ContenedorMongo');
const { sign } = require('crypto')
const productsDb = new Contenedor('products')
const messageDb = new ContenedorFirebase('messages')
const userDb = new ContenedorMongo('users', User)

app.use(express.json())
app.use(cookieParser('diega'))
app.use(flash())
app.use(session(
  {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true, 
    cookie:{
      httpOnly: false,
      secure: false,
      maxAge: 10000
    }
  }
))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "/public/"))
app.use(compression())

const reqLog = (req, res, next) => {
  logger.info(`Accediendo a ${req.url} mediante el método ${req.method}`)
  next()
}

app.use(reqLog)

app.use('/api', randoms);

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
let signIn = false
let info = false

io.on('connection', async (socket) => {
  let gotAll
    try {
      gotAll = await productsDb.getAll();
    } catch (error) {
      logger.error({error})
    }
  let gotAllMessages
    try {
      gotAllMessages = await messageDb.getAll();
    } catch (error) {
      logger.error({error})
    }
  let fakeIt = fakeProds();
  socket.emit('OpenS', ['Server Escuchando', signIn, info]);
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
  signIn = false;
  userSession = ''
  if (req.session.username){
    console.log(req.session.username)
    userSession = req.session.username
    res.render('index');
  } else {
    res.render('index')
  }
});

app.get('/sign-in', (req, res) => {
  signIn = true;
  res.render('signIn');
})

app.post('/sign-in', async (req, res) => {
  const userList = await userDb.getAll()
  const { user, password } = req.body
  const exists = userList.find(existing => existing.username === user)
  if (!exists) {
    console.log('no')
    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const newUser = { username: user, password: hashedPass}
    await userDb.save(newUser)
    io.emit('created', user)
  } else {
    console.log('si')
    io.emit('error', user)
  }
  
})

app.post('/login', passport.authenticate('auth', (err, user, info) => {
  if (!!err) {
    console.log(err)
  } else if (!user) {
    io.emit('logError')
  } else {
    io.emit('success', user.username)
  }
}), (req, res) => {
  console.log(req.isAuthenticated)
})

app.post('/logout', (req, res) => {
  req.session.destroy()
  res.send();
})

app.get('/api/productos-test', (req, res) => {
  signIn = false;
  res.render('fakeProds');
});

app.get('/info', (req, res) => {
  info = true;
  signIn = false
  const data = {
    args: process.argv.slice(2),
    platform: process.platform,
    node: process.version,
    rss: process.memoryUsage().rss,
    path: process.cwd(),
    pid: process.pid,
    folder: '/' + process.cwd().split('\\')[process.cwd().split('\\').length - 1]
  }
  console.log(process.argv.slice(2))
  console.log(process.platform)
  console.log(process.version)
  console.log(process.memoryUsage().rss)
  console.log(process.cwd())
  console.log(process.pid)
  console.log('/' + process.cwd().split('\\')[process.cwd().split('\\').length - 1])

  setTimeout(() => {
    io.emit('info', data)
  }, 1000)
  res.render('info');
});

app.get('*', (req, res) => {
  logger.warn(`Ruta ${req.url} inexistente para el método ${req.method}`)
  res.send({error: `Ruta ${req.url} inexistente para el método ${req.method}`})
})

server.listen(PORT, () => {
  console.info(`Server Arriba en ${PORT}`);
});