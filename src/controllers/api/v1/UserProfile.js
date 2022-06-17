const user = require("../../../models/User");
const mongoose = require("mongoose");
const Twilio_Service = require("../../../utils/twillio/userLogin");
const Helper = require("../../../helper/CommonFunctions");
const responseCode = require("../../../utils/locales/responseCode");
const responseMessage = require("../../../utils/locales/responseMessage");
const awsconfig = require("../../../config/aws");

class Profile {
  async UserProfile(req, res) {
    try {
      const userid = req.token_payload.UserData._id;

      const user_find = await user.find({ _id: userid });
      if (user_find) {
        const RequestBody = req.body; // fullname, username and profiePhoto will come in the request
        const profile_data = await user.findByIdAndUpdate(
          userid,
          {
            full_name: RequestBody.full_name,
            username: RequestBody.username,
            profile_photo:
              RequestBody.profile_photo == ""
                ? "null"
                : RequestBody.profile_photo,
            profile_completed: true,
          },
          {
            new: true,
          }
        );

        const data = {
          _id: profile_data._id,
          full_name: profile_data.full_name,
          username: profile_data.username,
          // profile_photo: profile_data.profile_photo == "" ? "null":awsconfig.BASEURL_PROFILE+profile_data.profile_photo,
          profile_photo: awsconfig.BASEURL_PROFILE + profile_data.profile_photo,
          profile_completed: true,
          photo_count: profile_data.photo_count,
        };
        const result = await profile_data.save();

        res
          .status(200)
          .send(
            Helper.responseWithData(true, responseCode.OK, "Success", data)
          );
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              "User not found"
            )
          );
      }
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            "Something went wrong"
          )
        );
    }
  }
}

module.exports = new Profile();
