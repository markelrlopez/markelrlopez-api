const express = require('express');
const cors = require('cors'); // Importa el paquete cors

const app = express();


app.use(express.json()); // Para analizar solicitudes JSON
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:4200', // Reemplaza con el origen de tu aplicación Angular
    methods: ['GET', 'POST'], // Especifica los métodos permitidos
  };
  
  app.use(cors(corsOptions));


const encuestasRoutes = require('./api/routes/tortillas')
const usuariosRoutes = require('./api/routes/usuarios')

app.use('/tortillas', encuestasRoutes)
app.use('/usuarios', usuariosRoutes)

module.exports = app;