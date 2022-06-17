const user = require("../../../models/User");
const mongoose = require("mongoose");
const Twilio_Service = require("../../../utils/twillio/userLogin");
const Helper = require("../../../helper/CommonFunctions");
const responseCode = require("../../../utils/locales/responseCode");
const responseMessage = require("../../../utils/locales/responseMessage");

class UserDetails {
  async getallusers(req, res) {
    const data = await user.find({});
    res.send(data);
  }
}

module.exports = new UserDetails();
