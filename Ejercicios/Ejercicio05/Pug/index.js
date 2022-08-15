const express = require('express');
const productos = require('./routes/productos');
const app = express();

app.use(express.json());
app.use(productos);
app.set("views", "./views")
app.set("view engine", "pug")

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(8080, () => {
  console.log("Server Arriba");
});