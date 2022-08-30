require('dotenv').config()
const express = require('express');
const app = express();

const cluster = require('cluster')
const os = require('os')

const cookieParser = require('cookie-parser');

const session = require('express-session')

const passport = require('./src/utils/passport')

const routes = require('./src/utils/routes')

const { engine } = require("express-handlebars")

const auth = require('./src/routes/auth');
const cart = require('./src/routes/cart');
const products = require('./src/routes/products');
const register = require('./src/routes/register');
const user = require('./src/routes/user');

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
  app.set("view engine", "hbs")
  app.engine("hbs", engine({
    extname: "hbs",
    layoutsDir: __dirname + "/src/views/layouts",
    partialsDir: __dirname + "/src/views/partials",
    defaultLayout: "main.hbs"
  }))

  app.use(auth);
  app.use('/api', cart);
  app.use('/api', products);
  app.use(register);
  app.use(user);

  app.get('/', (req, res) => {
    res.render("index", {script: '/scripts/index.js', routes: routes(req)})
  })

  app.get('*', function(req, res) {
    const route = req.originalUrl
    const method = req.method
    logger.warn(`Intento de navegación a ${method} ${route}`)
    res.send({error: 404, descripcion:`Erm, nos descubriste. No implementamos ${method} para la ruta ${route}`})
  });

  app.listen(PORT, () => {
    logger.info(`Server Arriba en el puerto: ${PORT}`);
  });
}