const express = require('express');
const productos = require('./routes/productos');
const app = express();

app.use(express.json());
app.use('/api', productos);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(8080, () => {
  console.log("Server Arriba");
});