const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1434,
    options: {
        encrypt: true, // Para Azure
        trustServerCertificate: true // Para desarrollo local
    },
    pool: {
        max: 10,           // Máximo de conexiones en el pool
        min: 0,
        idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar una conexión inactiva
    },
    connectionTimeout: 30000, // Tiempo máximo para conectar (ms)
    requestTimeout: 30000 
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
    sql,
    pool,
    poolConnect
};