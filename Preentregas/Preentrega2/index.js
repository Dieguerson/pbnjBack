const express = require('express');
const app = express();

const productos = require('./src/routes/productos');
const carrito = require('./src/routes/carrito');

console.log("Base de Datos: ", process.env.DB)

app.use(express.json());
app.use(express.static(__dirname + "/public/"))
app.use('/api', productos);
app.use('/api', carrito);

app.get('/', (req, res) => {
  res.sendFile("../public/index.html")
})

app.get('*', function(req, res) {
  const route = req.originalUrl
  const method = req.method
  res.send({error: 404, descripcion:`Erm, nos descubriste. No implementamos ${method} para la ruta ${route}`})
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server Arriba");
});