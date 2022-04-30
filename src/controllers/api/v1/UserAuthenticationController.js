const user = require('../../../models/User')
const UserDevices = require('../../../models/UserDevices')
const mongoose = require('mongoose')
const Twilio_Service = require('../../../utils/twillio/userLogin')
const Helper = require('../../../helper/commanFunction')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')
const { validationResult } = require('express-validator')

class User {
  async Userlogin (req, res) {
    const validationCheck = validationResult(req)
    if (!validationCheck.isEmpty()) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            validationCheck.errors[0].msg
          )
        )
    }
    const RequestBody = req.body //mobile_number ,device_name, device_version
    const mobile_number = RequestBody.mobile_number
    const country_isd_code = RequestBody.country_isd_code

    const full_number = country_isd_code + mobile_number

    try {
      const mobileFind = await user.findOne({
        mobile_number: mobile_number
      })

      // let user_otp = Math.floor(Math.random() * 100000 + 100000)

      if (mobileFind) {
        ;(mobileFind.otp = 1234),
          (mobileFind.otp_expire_at = Date.now() + 120000)
        await mobileFind.save()
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              true,
              responseCode.OK,
              responseMessage.OK
            )
          )
      } else {
        let new_user = await user.create(req.body)

        const user_otp = 1234
        new_user.otp = user_otp

        new_user.otp_expire_at = Date.now() + 120000

        // Twilio_Service.UserVirifyBySMS(new_user.mobile_number, user_otp)

        const result = await new_user.save({ createdAt: true })

        res.status(200).send(
          Helper.responseWithoutData(
            true,
            responseCode.OK,
            responseMessage.OK
            // token
          )
        )
      }
    } catch (error) {
      res.status(200).send(
        Helper.responseWithoutData(
          true,
          responseCode.OK,
          responseMessage.OK
          // token
        )
      )
    }
  }

  async UserOTPVerification (req, res) {
    try {
      const RequestBody = req.body

      let User = await user.find({
        mobile_number: RequestBody.mobile_number || 1234567890,
        country_isd_code: RequestBody.country_isd_code
      })

      if (User) {
        let id = User[0]._id

        if (User[0].otp == RequestBody.otp) {
          let carrentTime = new Date()
            .getTime()
            .toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
          carrentTime = parseInt(carrentTime.replaceAll(',', ''))
          if (User[0].otp_expire_at > carrentTime) {
            // Data come from the App side
            const request_data = {
              user_id: User[0]._id,
              device_token: RequestBody.device_token,
              device_name: RequestBody.device_name,
              device_version: RequestBody.device_version
            }

            const devicedata = await UserDevices.findOne({
              user_id: request_data.user_id
            })

            if (devicedata) {
              if (devicedata.device_token != request_data.device_token) {
                const updateID = await UserDevices.findOneAndUpdate(
                  { user_id: request_data.user_id },
                  {
                    device_token: request_data.device_token,
                    device_name: request_data.device_name,
                    device_version: request_data.device_version,
                    createdAt: Date.now
                  },
                  { new: true }
                )
              }
            } else {
              const new_user_device = await UserDevices.create(request_data)
            }
            let tokendata = {
              _id: User[0]._id,
              device_token: RequestBody.device_token
            }
            const token = Helper.generate_Token(tokendata)
            let data = {
              access_token: token
            }
            const user_active = await user.findByIdAndUpdate(
              User[0]._id,
              { is_active: 1 },
              { new: true }
            )
            res
              .status(200)
              .send(
                Helper.responseWithData(
                  true,
                  responseCode.OK,
                  responseMessage.OK,
                  data
                )
              )
          } else {
            res
              .status(200)
              .send(
                Helper.responseWithoutData(
                  false,
                  responseCode.UNAUTHORIZED,
                  responseMessage.UNAUTHORIZED
                )
              )
          }
        } else {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                false,
                responseCode.UNAUTHORIZED,
                responseMessage.UNAUTHORIZED
              )
            )
          return
        }
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.UNAUTHORIZED,
              responseMessage.UNAUTHORIZED
            )
          )
      }
    } catch (error) {
      console.log(error)
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

  async ResendOTP (req, res) {
    try {
      // const userid = req.token_payload.UserData._id
      console.lo
      const RequestBody = req.body // Number and OTP will come

      const FindMobile = await user.find({
        mobile_number: RequestBody.mobile_number,
        country_isd_code: RequestBody.country_isd_code
      })

      if (FindMobile) {
        // const user_otp = Math.floor(Math.random() * 100000 + 100000)
        // Twilio_Service.UserVirifyBySMS(FindMobile.mobile_number, user_otp)

        const update_otp = await user.findByIdAndUpdate(
          FindMobile[0]._id,
          { otp: 1234, otp_expire_at: Date.now() + 120000 },
          { new: true }
        )
        const result = await update_otp.save()

        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              true,
              responseCode.OK,
              responseMessage.OK
            )
          )
      } else {
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

  async UserLogout (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      const findUser = await user.findById({ _id: userid })
      if (findUser) {
        const user_active_status = await user.findByIdAndUpdate(
          userid,
          {
            is_active: 0
          },
          {
            new: true
          }
        )
        const remove_user_device = await UserDevices.findOneAndRemove({
          user_id: userid
        })
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.OK,
              responseMessage.OK
            )
          )
      } else {
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

module.exports = new User()
