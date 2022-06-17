const awsconfig = require("../../../config/aws");
const user = require("../../../models/User");
const UserDevices = require("../../../models/UserDevices");
const UserAlbum = require("../../../models//UserAlbums");
const AlbumPhotos = require("../../../models/UserAlbumPhoto");
const UserFriend = require("../../../models/UserFriend");
const Weekly_Notification = require("../../../utils/FirebasePushNotification/mut-device-notification-weekly");
const mongoose = require("mongoose");
const Twilio_Service = require("../../../utils/twillio/userLogin");
const Helper = require("../../../helper/CommonFunctions");
const responseCode = require("../../../utils/locales/responseCode");
const responseMessage = require("../../../utils/locales/responseMessage");
const { validationResult } = require("express-validator");

class User {
  async Userlogin(req, res) {
    const validationCheck = validationResult(req);
    if (!validationCheck.isEmpty()) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            validationCheck.errors[0].msg
          )
        );
    }
    const RequestBody = req.body; //mobile_number ,device_name, device_version
    const mobile_number = RequestBody.mobile_number;
    const country_isd_code = RequestBody.country_isd_code;

    const full_number = country_isd_code + mobile_number;

    try {
      const mobileFind = await user.findOne({
        mobile_number: mobile_number,
      });

      // let user_otp = Math.floor(Math.random() * 100000 + 100000)

      /**
       * If user already exists then update OTP and OTP Time
       */
      if (mobileFind) {
        mobileFind.otp = 1234;
        mobileFind.otp_expire_at = Date.now() + 120000;
        await mobileFind.save();
        res
          .status(200)
          .send(Helper.responseWithoutData(true, responseCode.OK, "success"));
      } else {
        /**
         * else create new user sa
         */
        let new_user = await user.create(req.body);
        new_user.full_number =
          new_user.country_isd_code + new_user.mobile_number;
        const user_otp = 1234;
        new_user.otp = user_otp;
        new_user.otp_expire_at = Date.now() + 120000;

        const Current_month = new Date();
        const Current_year = new Date().getFullYear();
        const user_registration_date =
          Current_month.toLocaleString("default", { month: "long" }) +
          " " +
          Current_year.toString();
        new_user.profile_created = user_registration_date;

        // Twilio_Service.UserVirifyBySMS(new_user.mobile_number, user_otp)

        const result = await new_user.save({ createdAt: true });

        res
          .status(200)
          .send(Helper.responseWithoutData(true, responseCode.OK, "success"));
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

  async UserOTPVerification(req, res) {
    try {
      const RequestBody = req.body;
      let User = await user.find({
        mobile_number: RequestBody.mobile_number || 1234567890,
        country_isd_code: RequestBody.country_isd_code,
      });

      if (User) {
        let id = User[0];

        if (User[0].otp == RequestBody.otp) {
          let carrentTime = new Date()
            .getTime()
            .toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
          carrentTime = parseInt(carrentTime.replaceAll(",", ""));
          if (User[0].otp_expire_at > carrentTime) {
            // Remove otp and expire time from the databse
            User[0].otp = null;
            User[0].otp_expire_at = null;
            await User[0].save();

            /**
             * Generate Randome string - Single Deveice support
             */
            const uniqe_string = Helper.Generate_random_string(20);
            // create user_device data for the user
            const request_data = {
              user_id: User[0]._id,
              device_token: RequestBody.device_token,
              device_name: RequestBody.device_name,
              device_version: RequestBody.device_version,
              unique_token: uniqe_string,
            };

            // const devicedata = await UserDevices.findOne({
            //   user_id: request_data.user_id
            // })

            // Update user_device data
            const updateID = await UserDevices.findOneAndUpdate(
              { user_id: request_data.user_id },
              {
                device_token: request_data.device_token,
                device_name: request_data.device_name,
                device_version: request_data.device_version,
                unique_token: uniqe_string,
                createdAt: Date.now,
              },
              { new: true }
            );

            if (!updateID) {
              const new_user_device = await UserDevices.create(request_data);
              // new_user_device.unique_token = uniqe_string
              // new_user_device.save();
            }

            let tokendata = {
              _id: User[0]._id,
              device_token: RequestBody.device_token,
              unique_token: uniqe_string,
            };
            const token = Helper.generate_Token(tokendata);
            // let data = {
            //   access_token: token
            // }
            const user_active = await user.findByIdAndUpdate(
              User[0]._id,
              { is_active: 1, user_exist: true },
              { new: true }
            );

            let data = {
              _id: User[0]._id,
              access_token: token,
              full_name: user_active.full_name,
              username: user_active.username,
              // profile_photo:
              //   user_active.profile_photo == ''
              //     ? 'null'
              //     : awsconfig.BASEURL_PROFILE + user_active.profile_photo
              profile_photo:
                awsconfig.BASEURL_PROFILE + user_active.profile_photo,
              photo_count: user_active.photo_count,
              profile_created: user_active.profile_created,
            };

            /**
             * Creating Default My Memories Album for new user
             */

            const userid = User[0]._id;
            const private_album = {
              user_id: userid,
              album_name: "My Memories",
              album_members: [userid],
            };

            const existData = await UserAlbum.find({
              album_name: private_album.album_name,
              user_id: userid,
            });

            if (!existData[0]) {
              const createAlbum = await new UserAlbum(private_album);
              // createAlbum.album_members.push(private_album.album_members)
              // createAlbum.user_id = private_album.user_id
              // createAlbum.photo_count = 10
              await createAlbum.save({ createdAt: true });
              /**
               * Create albumPhoto block for that particul
               */
              const findAlbumphotoblock = await AlbumPhotos.findOne({
                album_id: createAlbum._id,
              });
              if (!findAlbumphotoblock) {
                const findAlbum = await AlbumPhotos.create({});
                findAlbum.album_id = createAlbum._id;
                await findAlbum.save({ createdAt: true });
              }
            }

            /**
             * ---------------- Push notification to all friends  ----------------
             */

            const user_device_token = await UserDevices.find({
              user_id: userid,
            }).select("-_id device_token");

            const Notification_data = {
              title: `Your new 10 film pack has been delivered. Enjoy!`,
              text: `Your new 10 film pack has been delivered. Enjoy!`,
            };
            const payload = {
              type: 5
            }
            Weekly_Notification(
              User[0]._id,
              Notification_data.title,
              Notification_data.text,
              user_device_token[0].device_token,
              payload
            );
            /**
             * ---------------- Push notification to all friends  ----------------
             */

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
                  responseCode.UNAUTHORIZED,
                  "OTP is expire, Please try again"
                )
              );
          }
        } else {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                false,
                responseCode.BAD_REQUEST,
                "The OTP entered is incorrect. Please enter correct OTP"
              )
            );
          return;
        }
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              "User not exist, Please first login"
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

  async ResendOTP(req, res) {
    try {
      // const userid = req.token_payload.UserData._id
      const RequestBody = req.body; // Number and OTP will come

      const FindMobile = await user.find({
        mobile_number: RequestBody.mobile_number,
        country_isd_code: RequestBody.country_isd_code,
      });

      if (FindMobile) {
        // const user_otp = Math.floor(Math.random() * 100000 + 100000)
        // Twilio_Service.UserVirifyBySMS(FindMobile.mobile_number, user_otp)

        const update_otp = await user.findByIdAndUpdate(
          FindMobile[0]._id,
          { otp: 1234, otp_expire_at: Date.now() + 120000 },
          { new: true }
        );
        const result = await update_otp.save();

        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              true,
              responseCode.OK,
              "OTP send successfully"
            )
          );
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              "Phone number does not exist"
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

  async UserLogout(req, res) {
    try {
      const userid = req.token_payload.UserData._id;
      const findUser = await user.findById({ _id: userid });
      if (findUser) {
        const user_active_status = await user.findByIdAndUpdate(
          userid,
          {
            is_active: 0,
          },
          {
            new: true,
          }
        );
        const remove_user_device = await UserDevices.findOneAndRemove({
          user_id: userid,
        });
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.OK,
              "Logout succesfully"
            )
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

  async deleteUser(req, res) {
    try {
      const id = req.body.id;
      const deleteUser = await user.findByIdAndRemove(id);
      res.send("User delete succesfully");
    } catch (error) {
      res.send(error.message);
    }
  }

  async deletecollection(req, res) {
    try {
      const data = req.body.data;

      if (data == "1") {
        user.collection.drop(); //1
      } else if (data === "2") {
        UserAlbum.collection.drop(); //2
      } else if (data == "3") {
        UserDevices.collection.drop(); //3
      } else if (data == "4") {
        AlbumPhotos.collection.drop(); //4
      } else if (data == "5") {
        UserFriend.collection.drop(); //5
      }

      res
        .status(200)
        .send(
          Helper.responseWithoutData(true, responseCode.OK, responseMessage.OK)
        );
    } catch (error) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            true,
            responseCode.INTERNAL_SERVER_ERROR,
            error.message
          )
        );
    }
  }
}

module.exports = new User();
