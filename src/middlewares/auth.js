const crypto = require('crypto');
const dotenv = require("dotenv/config");
const jwt = require("jsonwebtoken");
const { decode } = require('punycode');

const Helper = require("../helper/commanFunction");
const responseMessage = require("../utils/locales/responseMessage");
const responseCode = require("../utils/locales/responseCode");

class autorizationController {
  // API Authorization
  async validateApiKey(req, res, next) {
    let access_token = req.get("token");
    let nonce = req.get("nonce");
    let timestamp = req.get("timestamp");
    let hash_str =
      "nonce=" +
      nonce +
      "&timestamp=" +
      timestamp +
      "|" +
      process.env.APISECRETKEY;
    try {
      const hmac1 = crypto
        .createHmac(process.env.HASHKEY, process.env.APIPRIVATEKEY)
        .update(hash_str)
        .digest("hex");
      if (access_token === hmac1) {
        return next();
      } else {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              responseMessage.BAD_REQUEST
            )
          );
      }
    } catch (err) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  verifyjwtToken = (req, res, next) => {
    let token = req.headers["authorization"];
    // console.log("==========> token :" + token);
    if (!token) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            responseMessage.BAD_REQUEST
          )
        );
    }
    try {
      // token = token.split(" ")[1];
      console.log("test1")
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      console.log(decoded)
    
      let carrentTime = new Date()
        .getTime()
        .toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      carrentTime = parseInt(carrentTime.replaceAll(',', ''))
    
      req.token_payload = decoded;
      
    }  catch (err) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.UNAUTHORIZED,
            responseMessage.UNAUTHORIZED
          )
        );
    }
    return next();
  };
}

module.exports =  new autorizationController();
