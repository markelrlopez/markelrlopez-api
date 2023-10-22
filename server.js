const http = require('http');
const app = require('./app');
const mysql = require('mysql');
const dbConnection = require('./db');

const port = 3000;

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.use((req, res, next) => {
    req.dbConnection = dbConnection; // Agrega la conexión a la base de datos al objeto de solicitud
    next();
  });