require('dotenv').config()

const yargs = require('yargs/yargs')
const args = process.argv.slice(2)
const yargedArgs = yargs(args).default({ PORT: 8080, DATABASE: 'FIREBASE' }).alias({ p: 'PORT', db: 'DATABASE' }).argv
const PORT = process.env.PORT || yargedArgs.PORT
const DATABASE = yargedArgs.DATABASE
process.env.DATABASE = DATABASE

const compression = require('compression')

const home = require('./src/routes/home')
// const auth = require('./src/routes/auth')
// const infoView = require('./src/routes/info')
// const fake = require('./src/routes/fake')
// const randoms = require('./src/routes/randoms');
// const products = require('./src/routes/products');
// const catcher = require('./src/routes/catcher');

const Koa = require('koa');
const koaBody = require('koa-body')
const handlebars = require('koa-handlebars')
const app = new Koa();
// const http = require('http');
// const server = http.createServer(app);
// const ioConnection = require('./src/controllers/socketController')
// ioConnection(server)

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./src/utils/passport')

const { engine } = require('express-handlebars');

const logger = require('./src/utils/logger')

// const reqLogger = (req, _, next) => {
//   logger.info(`Accediendo a ${req.url} mediante el método ${req.method}`)
//   next()
// }

app.use(koaBody())

app.use(compression())

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(reqLogger)

app.use(cookieParser())
app.use(session(
  {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true, 
    cookie: {
      httpOnly: false,
      secure: false,
      _expires: 7 * 24 * 60 * 60 * 1000
    }
  }
  ))
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use(home)
  // app.use(auth)
  // app.use(infoView)
  // app.use('/api', fake)
  // app.use('/api', randoms);
  // app.use('/api', products);
  // app.use(catcher);
  
  app.listen(PORT, () => {
    console.info(`Server Arriba en ${PORT}`);
  });