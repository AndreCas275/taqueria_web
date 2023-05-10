module.exports = {
    puertos: {
        PORT: process.env.PORT || 4000,
        DB_HOST: process.env.DB_HOST || 'aws.connect.psdb.cloud',
        DB_USER: process.env.DB_USER || 'q9gy7vjd3n6pfjnu78v6',
        DB_PASSWORD: process.env.DB_PASSWORD || 'pscale_pw_CpL948Dqz1CoXOrWrX1uiMkOciFxHSCsDX94vhnZ5Jk',
        DB_NAME: process.env.DB_NAME || 'taqueria_db',
        DB_PORT: process.env.DB_PORT || 3306
    }
};