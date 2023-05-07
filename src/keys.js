const { puertos } = require('./config');

module.exports = {
    database: {
        host: puertos.DB_HOST,
        user: puertos.DB_USER,
        password: puertos.DB_PASSWORD,
        database: puertos.DB_NAME,
        port: puertos.DB_PORT
    }
};