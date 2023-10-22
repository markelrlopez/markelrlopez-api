const mysql = require('mysql');

const dbConfig = {
  host: 'markelrlopez.com',
  user: 'u514554659_marru',
  password: '+F2kFS5ns0s',
  database: 'u514554659_Encuestas',
  conectionLimit :10,
};

const pool = mysql.createPool(dbConfig);

// Manejar errores de conexión
pool.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});

pool.getConnection((err, connection) => {
  if (err) {
      console.error('Error de conexión a la base de datos:', err);
  } else {
      console.log('Conexión exitosa a la base de datos MySQL');
      // Puedes realizar operaciones adicionales aquí si es necesario
      connection.release(); // Devuelve la conexión al pool
  }
});

module.exports = pool;
