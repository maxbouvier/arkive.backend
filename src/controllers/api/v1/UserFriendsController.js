const user = require('../../../models/User')
const UserFriend = require('../../../models/UserFriend')
const mongoose = require('mongoose')
const Twilio_Service = require('../../../utils/twillio/userLogin')
const Helper = require('../../../helper/commanFunction')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')

class Friends {
  async UserFriendRequestSend (req, res) {
    const userid = req.token_payload.UserData._id

    const toUser = req.body._id
    /**
     * Check with static data
     */

    const data = {
      from_user_id: userid,
      to_user_id: toUser,
      request_status: 0
    }

    let friend_request = await UserFriend.create(data)

    res
      .status(200)
      .send(
        Helper.responseWithData(
          false,
          responseCode.OK,
          responseMessage.OK,
          friend_request
        )
      )
  }
  async UserFriendRequestAccpet (req, res) {
    const userid = req.token_payload.UserData._id
    const _id = req.body._id

    const data = await UserFriend.findById(_id)
    data.request_status = 1
    await data.save()
    console.log(data)

    const add_friend_data = await user.findByIdAndUpdate(data.from_user_id, {
      $push: { friends: data.to_user_id }
    })

    res
      .status(200)
      .send(
        Helper.responseWithData(true, responseCode.OK, responseMessage.OK, data)
      )

  }

  async demo (req, res) {
    const data = await UserFriend.find().populate('from_user_id')
    res.send(data)
  }
}

module.exports = new Friends()
