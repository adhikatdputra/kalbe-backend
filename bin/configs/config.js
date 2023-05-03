require('dotenv').config();

const config = {
  env: process.env.ENV,
  hostname: process.env.HOST_NAME,
  port: process.env.PORT || 3000,
  secretKeyJwt: process.env.SECRET_KEY_JWT,
  secretKeyJwtRefresh: process.env.SECRET_KEY_JWT_REFRESH,
  baseUrl: process.env.BASE_URL,
  mysql: {
    mysqlDb: process.env.MYSQL_DB_NAME,
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDialeg: process.env.dialect
  },
};

module.exports = config;
