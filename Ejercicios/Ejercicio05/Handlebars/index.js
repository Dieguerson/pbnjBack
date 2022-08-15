const express = require('express');
const {engine} = require("express-handlebars")
const productos = require('./routes/productos');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public/"))
app.use(productos);
app.set("views", "./views")
app.set("view engine", "hbs")
app.engine("hbs", engine({
  extname: "hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  defaultLayout: "main.hbs"
}))

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(8080, () => {
  console.log("Server Arriba");
});