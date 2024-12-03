// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Connection, Request } = require('tedious');
const app = express();
const port = 3000;

// Configuración SQL Server con tedious
const config = {
  server: 'K4LY\\SQLEXPRESS',
  authentication: {
    type: 'default',
    options: {
      trustedConnection: true
    }
  },
  options: {
    database: 'UniversidadDB',
    trustServerCertificate: true,
    encrypt: false,
    instanceName: 'SQLEXPRESS'
  }
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test de conexión
function testConnection() {
  const connection = new Connection(config);
  
  connection.on('connect', (err) => {
    if (err) {
      console.error('Error de conexión:', err);
      return;
    }
    console.log('Conexión exitosa a SQL Server');
  });

  connection.connect();
}

// Start server
app.listen(port, () => {
  testConnection();
  console.log(`Servidor escuchando en el puerto ${port}`);
});