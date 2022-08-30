require('dotenv').config()
const express = require('express');
const { engine } = require("express-handlebars")

const productos = require('./src/routes/productos');
const carrito = require('./src/routes/carrito');
const registro = require('./src/routes/registro');
const login = require('./src/routes/login');
const user = require('./src/routes/user');
const session = require('express-session')
const passport = require('./passport')
const cookieParser = require('cookie-parser');

const routes = require('./routes')

const app = express();

app.use((req, res, next) => {
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

app.use('/api', productos);
app.use('/api', carrito);
app.use(registro);
app.use(login);
app.use(user);

app.set("views", "./src/views")
app.set("view engine", "hbs")
app.engine("hbs", engine({
  extname: "hbs",
  layoutsDir: __dirname + "/src/views/layouts",
  partialsDir: __dirname + "/src/views/partials",
  defaultLayout: "main.hbs"
}))

app.get('/', (req, res) => {
  res.render("index", {script: '/scripts/main.js', routes: routes(req)})
})

app.get('*', function(req, res) {
  const route = req.originalUrl
  const method = req.method
  res.send({error: 404, descripcion:`Erm, nos descubriste. No implementamos ${method} para la ruta ${route}`})
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server Arriba");
});