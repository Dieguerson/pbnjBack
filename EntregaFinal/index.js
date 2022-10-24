require('dotenv').config()
const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app)

const ioConnection = require('./src/utils/socket.io')
ioConnection(server)

const cors = require('cors')

const cluster = require('cluster')
const os = require('os')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session')

const { passport } = require('./src/utils/passport')

const { engine } = require("express-handlebars")

const home = require('./src/routes/home');
const info = require('./src/routes/info');
const cart = require('./src/entities/cart/cartRoutes');
const products = require('./src/entities/products/productsRoutes');
const chat = require('./src/entities/chat/chatRoutes');
const purchase = require('./src/entities/purchase/purchaseRoutes');
const user = require('./src/entities/user/userRoutes');
const error = require('./src/routes/error');

const PORT = process.env.PORT || 8080
const { MODE } = process.env
const cpus = os.cpus().length
const pid = process.pid

const logger = require('./src/utils/logger')

if (cluster.isMaster && MODE === 'CLUSTER') {
  logger.info('Master Process - pid: ' + pid)
  for (let i = 0; i < cpus; i++){
    cluster.fork()
  }

  cluster.on('exit', (_) => {
    logger.info(`Worker ${pid}`)
  })
} else {
  logger.info('Worker Process - pid: ' + pid)

  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

  app.use(session({
    secret: 'Diega',
    resave: true,
    saveUninitialized: true,
    rolling: true, 
    cookie: {
      httpOnly: false,
      secure: false,
      _expires: 7 * 24 * 60 * 60 * 1000
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(express.json());
  app.use(express.static(__dirname + "/public/"))

  app.set("views", "./src/views")
  app.set("view engine", "pug")
  app.set("view engine", "ejs")
  app.set("view engine", "hbs")
  app.engine("hbs", engine({
    extname: "hbs",
    layoutsDir: __dirname + "/src/views/handlebars/layouts",
    partialsDir: __dirname + "/src/views/handlebars/partials",
    helpers: {
      roleInformer: (role) => {
        const  rolDefinition = role ? 'Administrador' : 'Usuario'
        return rolDefinition
      }
    },
    defaultLayout: "main.hbs"
  }))

  app.use(cors())

  app.use(home);
  app.use(info);
  app.use(cart);
  app.use(products);
  app.use(chat);
  app.use(purchase);
  app.use(user);
  app.get('/404', (req, res) => {
    res.render('EJS/error.ejs', {data:{id: 400, description: "El producto que estás buscando no existe"}})
  })
  app.use(error);

  server.listen(PORT, () => {
    logger.info(`Server Arriba en el puerto: ${PORT}`);
  });
}