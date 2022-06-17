require("dotenv").config();
/**
 * @description configuration of database : MySql
 */

const awsconfig = {
  BASEURL_PROFILE: process.env.BASEURL_PROFILE,
  BASEURL_ALBUM: process.env.BASEURL_ALBUMPHOTOS,
};

module.exports = awsconfig;
