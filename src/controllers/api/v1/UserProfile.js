const user = require('../../../models/User')
const mongoose = require('mongoose')
const Twilio_Service = require('../../../utils/twillio/userLogin')
const Helper = require('../../../helper/commanFunction')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')

class Profile {
  async UserProfile (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      const user_find = await user.find({_id : userid});
      if(user_find){
        const RequestBody = req.body // fullname, username and profiePhoto will come in the request
        const profile_data = await user.findByIdAndUpdate(
          userid,
          {
            full_name: RequestBody.full_name,
            username: RequestBody.username,
            profile_photo: RequestBody.profile_photo
          },
          {
            new: true
          }
        )
        const result = await profile_data.save()
        res
        .status(200)
        .send(
          Helper.responseWithData(
            true,
            responseCode.OK,
            responseMessage.OK,
            result
          )
        )
      }else{
        res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.NOT_FOUND,
            responseMessage.NOT_FOUND
          )
        )

      }
    

    } catch (error) {
        res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            responseMessage.BAD_REQUEST
          )
        )

    }
  }
}

module.exports = new Profile();
