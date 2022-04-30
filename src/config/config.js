require('dotenv').config()
/**
 * @description configuration of database : MySql
 */

const config = {

  APP_URL: process.env.SERVERURL,
  LOCALURL : process.env.LOCAL_URL,
  HOST: process.env.DBHOST,
  DB: process.env.DB_NAME,
  port: process.env.PORT,
  DB_URI : process.env.DB_URI,
  logging: true
}

module.exports = config
