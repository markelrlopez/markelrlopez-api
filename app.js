const express = require('express');
const cors = require('cors'); // Importa el paquete cors

const app = express();


app.use(express.json()); // Para analizar solicitudes JSON
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:4200', // Reemplaza con el origen de tu aplicación Angular
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};


app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://markelrlopez.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
const encuestasRoutes = require('./api/routes/tortillas')
const usuariosRoutes = require('./api/routes/usuarios')

app.use('/tortillas', encuestasRoutes)
app.use('/usuarios', usuariosRoutes)

module.exports = app;