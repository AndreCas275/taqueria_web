const { puertos } = require('./config');

module.exports = {
    database: {
        host: puertos.DB_HOST,
        user: puertos.DB_USER,
        password: puertos.DB_PASSWORD,
        port: puertos.DB_PORT,
        database: puertos.DB_NAME
    }
};