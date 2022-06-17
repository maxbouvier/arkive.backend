const awsconfig = require('../../../config/aws')
const user = require('../../../models/User')
const UserFriend = require('../../../models/UserFriend')
const UserDevices = require('../../../models/UserDevices')
const mongoose = require('mongoose')
const Twilio_Service = require('../../../utils/twillio/userLogin')
const Helper = require('../../../helper/CommonFunctions')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')
const userDevices = require('../../../models/UserDevices')
const send_fcm_notifications = require('../../../utils/FirebasePushNotification/mut-device-notification')

class Friends {
  async UserFriendRequestSend (req, res) {
    try {
      const userid = req.token_payload.UserData._id

      const toUser = req.body.to_user_id
      /**
       * Check with static data
       */

      const data = {
        from_user_id: userid,
        to_user_id: toUser,
        request_status: 0
      }

      let friend_request = await UserFriend.create(data)

      /**
       * Friend Request send notification
       */
      const from_user = await user.findById(userid)
      const to_user = await UserDevices.findOne({ user_id: toUser })
      let device_token_arr = []
      device_token_arr.push(to_user.device_token)
      console.log(to_user.device_token)
      const message_title = 'Friend Request'
      const message_text = `${from_user.full_name} just sent you a friend request `
      const payload = {
        type: 1
      }

      send_fcm_notifications(message_title, message_text, device_token_arr, payload)

      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            true,
            responseCode.OK,
            'Success',
            friend_request
          )
        )
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.NOT_FOUND,
            'User not found'
          )
        )
    }
  }

  async UserFriendRequestAccpetDenied (req, res) {
    let userid = req.token_payload.UserData._id
    let _id = req.body._id
    let flag = req.body.flag // 1 = accept 2 = reject

    try {
      if (flag == '1') {
        let data = await UserFriend.findOne({
          from_user_id: _id,
          to_user_id: userid
        })

        if (data) {
          data.request_status = 1
          await data.save()

          /**
           * Friend request accept response
           */
          const from_user = await user.findById(userid)
          const to_user = await UserDevices.findOne({ user_id: _id })
          let device_token_arr = []
          device_token_arr.push(to_user.device_token)
          const message_title = 'Friend Request Status'
          const message_text = `${from_user.full_name} accept your friend request `
          console.log(message_text)
          const payload = {
            type: 2
          }
          send_fcm_notifications(message_title, message_text, device_token_arr, payload)

          res
            .status(200)
            .send(Helper.responseWithoutData(true, responseCode.OK, 'Accepted'))
        }
      } else if (flag == '2') {
        await UserFriend.findOneAndRemove({
          from_user_id: _id,
          to_user_id: userid
        })
        res
          .status(200)
          .send(Helper.responseWithoutData(true, responseCode.OK, 'Rejected'))
      }
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            true,
            responseCode.INTERNAL_SERVER_ERROR,
            'Something went wrong'
          )
        )
    }
  }

  async Contacts (req, res) {
    try {
      const userid = req.token_payload.UserData._id

      /**
       ***********************************************************   USER FRIEND COUNT  *************************************************
       */
      const data = []
      const friends1 = await UserFriend.find({
        from_user_id: userid,
        request_status: 1
      }).select('to_user_id -_id')

      const friends2 = await UserFriend.find({
        to_user_id: userid,
        request_status: 1
      }).select('from_user_id -_id')

      for (let i = 0; i < friends1.length; i++) {
        data.push(friends1[i].to_user_id)
      }
      for (let i = 0; i < friends2.length; i++) {
        data.push(friends2[i].from_user_id)
      }

      const friends = await user.aggregate([
        { $match: { _id: { $in: data } } },
        {
          $project: {
            _id: 1,
            mobile_number: 1,
            username: 1,
            full_name: 1,
            // profile_photo:{$cond:{if:'$profile_photo'!==null,then:{$concat:[awsconfig.BASEURL_PROFILE , '$profile_photo']},else:null}},
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      /**
       ***********************************************************   USER PENING REQUEST COUNT   *************************************************
       */
      const Pending = await UserFriend.find({
        to_user_id: userid,
        request_status: 0
      }).select('-_id from_user_id')

      const pendingReq = []
      for (let i = 0; i < Pending.length; i++) {
        pendingReq.push(Pending[i].from_user_id)
      }

      // const PendingRequest = await user
      //   .find({ _id: pendingReq })
      //   .select('_id full_name username profile_photo')

      const PendingRequest = await user.aggregate([
        { $match: { _id: { $in: pendingReq } } },
        {
          $project: {
            _id: 1,
            mobile_number: 1,
            username: 1,
            full_name: 1,
            // profile_photo:{$cond:{if:'$profile_photo'!==null,then:{$concat:[awsconfig.BASEURL_PROFILE , '$profile_photo']},else:"null"}};
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      /**
       ***********************************************************   USER TOTAL CONTACTS COUNT  (REMOVE FRIENDS AND PENDING REQUEST)   *************************************************
       */

      let contacts = req.body

      const owner_user = await user
        .findById(userid)
        .select('full_number mobile_number')

      let new_contact = Helper.RearrangContact(
        contacts,
        owner_user.mobile_number,
        owner_user.full_number
      )

      let user_list = []
      const user_contact = await user
        .find({
          $or: [{ mobile_number: new_contact }, { full_number: new_contact }]
        })
        .select('_id')

      for (let i = 0; i < user_contact.length; i++) {
        user_list.push(user_contact[i]._id)
      }

      /**
       * *******************************************  Remove existing friends from the contacts list  ***************************************************************************
       */

      for (var i = 0; i < user_list.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (user_list[i].equals(data[j]) === true) {
            user_list.splice(i, 1)
          }
        }
      }

      /**
       * *******************************************  Remove user pending friends request from the contacts list  ***************************************************************************
       */
      for (var i = 0; i < user_list.length; i++) {
        for (var j = 0; j < pendingReq.length; j++) {
          if (user_list[i].equals(pendingReq[j]) === true) {
            if (i == 0) {
              user_list.splice(0, i + 1)
            } else {
              user_list.splice(i - 1, i)
            }
          }
        }
      }

      /**
       * Final total contacts list after adding all filters
       */
      // let contactDetails = await user
      //   .find({ _id: user_list, profile_completed: true })
      //   .select('_id full_name username profile_photo')

      const contactDetails = await user.aggregate([
        { $match: { _id: { $in: user_list }, profile_completed: true } },
        {
          $project: {
            _id: 1,
            mobile_number: 1,
            username: 1,
            full_name: 1,
            // profile_photo:{$cond:{if:'$profile_photo'!==null,then:{$concat:[awsconfig.BASEURL_PROFILE , '$profile_photo']},else:"null"}},
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      /**
       * adding request status in contacts
       */
      let FinalContact = []
      for (let i = 0; i < contactDetails.length; i++) {
        const userID = contactDetails[i]._id
        const ddd = await UserFriend.find({
          to_user_id: userID,
          from_user_id: userid,
          request_status: 0
        }).select('-_id to_user_id request_status')
        if (ddd[0] != null) {
          let obj = contactDetails[i]
          obj.request_status = 0
          FinalContact.push(obj)
        } else {
          let obj = contactDetails[i]
          obj.request_status = null
          FinalContact.push(obj)
        }
      }
      /**
       *  sending final response to user
       */
      const finaResult = {
        Friends: friends,
        contacts: FinalContact,
        PendingRequest: PendingRequest
      }

      res
        .status(200)
        .send(
          Helper.responseWithData(true, responseCode.OK, 'Success', finaResult)
        )
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.NOT_FOUND,
            error.message
          )
        )
    }
  }

  async RemoveFriend (req, res) {
    const userid = req.token_payload.UserData._id
    const removeID = req.body.to_user_id
    try {
      const friendremove1 = UserFriend.findOneAndRemove({
        from_user_id: userid,
        to_user_id: removeID
      })
      const friendremove2 = UserFriend.findOneAndRemove({
        from_user_id: removeID,
        to_user_id: userid
      })

      Promise.all([friendremove1, friendremove2])
        .then(() => {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                true,
                responseCode.OK,
                'Friend remove successfully'
              )
            )
        })
        .catch(() => {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                true,
                responseCode.NOT_FOUND,
                'Friend not found'
              )
            )
        })
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            'Something went wrong'
          )
        )
    }
  }

  async getFriends (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      const data = []
      const friends1 = await UserFriend.find({
        from_user_id: userid,
        request_status: 1
      }).select('to_user_id -_id')

      const friends2 = await UserFriend.find({
        to_user_id: userid,
        request_status: 1
      }).select('from_user_id -_id')

      for (let i = 0; i < friends1.length; i++) {
        data.push(friends1[i].to_user_id)
      }
      for (let i = 0; i < friends2.length; i++) {
        data.push(friends2[i].from_user_id)
      }

      const friends = await user.aggregate([
        { $match: { _id: { $in: data } } },
        {
          $project: {
            mobile_number: 1,
            username: 1,
            full_name: 1,
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      res
        .status(200)
        .send(
          Helper.responseWithData(true, responseCode.OK, 'Success', friends)
        )
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            true,
            responseCode.INTERNAL_SERVER_ERROR,
            'Something went wrong'
          )
        )
    }
  }
}

module.exports = new Friends()
