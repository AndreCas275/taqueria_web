const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se cerro la conexion con la base de datos');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tienes demasiadas conexions');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Tu conexion a la base de datos fue rechazada');
        }
    }
    if (connection) connection.release();
    console.log('Coneccion a la base correcta');
    return;
});

//Promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;