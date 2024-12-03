// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configuración SQL Server actualizada
const config = {
  server: 'K4LY\\SQLEXPRESS',
  database: 'UniversidadDB',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false,
    integratedSecurity: true
  }
};

// Test de conexión explícito
async function testConnection() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT 1');
    console.log('Test de conexión exitoso');
    return pool;
  } catch (err) {
    console.error('Error de conexión:', err);
    throw err;
  }
}

// Iniciar servidor con test de conexión
async function iniciarServidor() {
  try {
    // Middleware setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // Test conexión antes de iniciar
    const pool = await testConnection();
    
    // Iniciar servidor solo si la conexión es exitosa
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });

    return pool;
  } catch (err) {
    console.error('Error fatal al iniciar servidor:', err);
    process.exit(1);
  }
}

iniciarServidor();