const awsconfig = require('../../../config/aws')
const user = require('../../../models/User')
const UserAlbum = require('../../../models//UserAlbums')
const UserFriend = require('../../../models/UserFriend')
const AlbumPhotos = require('../../../models/UserAlbumPhoto')
const userDevices = require('../../../models/UserDevices')
const send_fcm_notifications = require('../../../utils/FirebasePushNotification/mut-device-notification')
const Helper = require('../../../helper/CommonFunctions')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')
const { validationResult } = require('express-validator')

class Album {
  async CreateAlbum (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      const Username = await user.findById(userid).select('full_name')

      const data = {
        user_id: userid,
        album_name: req.body.album_name,
        album_members: req.body.album_members
      }

      const existData = await UserAlbum.find({
        album_name: data.album_name,
        user_id: userid
      })

      if (existData[0]) {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.CONFLICT,
              'Album already exists'
            )
          )
      } else {
        const createAlbum = await UserAlbum.create(data)
        createAlbum.album_members.push(userid)
        await createAlbum.save({ createdAt: true })
        /**
         * Create albumPhoto block for that particul
         */
        const findAlbumphotoblock = await AlbumPhotos.findOne({
          album_id: createAlbum._id
        })
        if (!findAlbumphotoblock) {
          const findAlbum = await AlbumPhotos.create({})
          findAlbum.album_id = createAlbum._id
          await findAlbum.save({ createdAt: true })
        }

        /**
         * ------------------------------  Push Notification Code ------------------------------
         */
        const device_tokens = []
        const User_device_token = await userDevices
          .find({ user_id: data.album_members })
          .select('device_token -_id')
        for (let i = 0; i < User_device_token.length; i++) {
          device_tokens.push(User_device_token[i].device_token)
        }

        const payload = {
          album_id: createAlbum._id,
          type : 3
        }
        const message_title = 'Member added'
        const message_text = `${Username.full_name} added you to the album ${data.album_name} `
        send_fcm_notifications(
          message_title,
          message_text,
          device_tokens,
          payload
        )

        /**
         * ------------------------------  Push Notification Code ------------------------------
         */

        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.OK,
              'Album Create Successsfully'
            )
          )
      }
    } catch (error) {
      res.status(200).send(
        Helper.responseWithoutData(
          false,
          responseCode.INTERNAL_SERVER_ERROR,
          // responseMessage.INTERNAL_SERVER_ERROR
          'Something went wrong'
        )
      )
    }
  }


  async UpdateAlbum (req, res) {
    try {
      const albumID = req.body
      const update_members = req.body.album_members
      const userid = req.token_payload.UserData._id

      const updateAlbum = await UserAlbum.findByIdAndUpdate(
        albumID._id,
        {
          album_name: req.body.album_name,
          album_members: req.body.album_members,
          updated_at: Date.now()
        },
        { new: true }
      )
      updateAlbum.album_members.push(userid)
      await updateAlbum.save({ createdAt: true })

      /**
       * Push Notification Code
       */
      // const ages = update_members
      // const exist_album_members = await UserAlbum.findById(req.body.)
      // const arr1 = update_members
      // const arr2 = [1, 3, 8]

      // let unique1 = arr1.filter(o => arr2.indexOf(o) === -1)
      // let unique2 = arr2.filter(o => arr1.indexOf(o) === -1)

      // const unique = unique1.concat(unique2)

      // console.log(unique)
      /**
       * Push Notification Code
       */

      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            true,
            responseCode.OK,
            'Album update successfully'
          )
        )
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


  async DeleteAlbum (req, res) {
    try {
          const albumID = req.body
          const userid = req.token_payload.UserData._id
          const updateAlbum = await UserAlbum.findById(albumID._id)

          const user_id = JSON.stringify(updateAlbum.user_id)
          if (
            userid == user_id.substring(1, user_id.length - 1) &&
            updateAlbum.album_name !== 'My Memories'
          ) {
            const deleteAlbum = await UserAlbum.findByIdAndRemove(albumID._id)
            res
              .status(200)
              .send(
                Helper.responseWithoutData(
                  true,
                  responseCode.OK,
                  'Album deleted successfully'
                )
              )
          } else {
            res
              .status(200)
              .send(
                Helper.responseWithoutData(
                  true,
                  responseCode.UNAUTHORIZED,
                  'You can not delete this album, Only admin can delete this album'
                )
              )
          }
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


  async getUserAlbums (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      const finduser = await UserAlbum.find({ user_id: userid })
      if (finduser) {
        const totalalbum = await UserAlbum.find({
          $or: [{ user_id: userid }, { album_members: userid }]
        })
          .select('-created_at -updated_at -__v')
          .sort({ created_at: -1 }) // latest album come first

        let responseTotalAlbum = []
        let obj = totalalbum[totalalbum.length - 1].toObject()
        obj.is_admin = 2
        responseTotalAlbum.push(obj)
        for (let i = 0; i < totalalbum.length - 1; i++) {
          if (totalalbum[i].user_id == userid) {
            let obj = totalalbum[i].toObject()
            obj.is_admin = 1
            responseTotalAlbum.push(obj)
          } else {
            let obj = totalalbum[i].toObject()
            obj.is_admin = 0
            responseTotalAlbum.push(obj)
          }
        }
        res
          .status(200)
          .send(
            Helper.responseWithData(
              true,
              responseCode.OK,
              'Success',
              responseTotalAlbum
            )
          )
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              'Use not found'
            )
          )
      }
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


  async sendImage (req, res) {
    try {
      const userid = req.token_payload.UserData._id
      let user_details = await user.findById(userid)
      if (user_details.photo_count !== 0) {
        let Image_details = {
          image: req.body.Image_details.image,
          photo_uplode_time: req.body.Image_details.photo_uplode_time,
          username: user_details.username,
          profile_photo: user_details.profile_photo
        }

        const Album_Id = req.body.album_id
        const data = await AlbumPhotos.find({ album_id: Album_Id })

        for (let i = 0; i < data.length; i++) {
          const addData = await AlbumPhotos.findOne({
            album_id: data[i].album_id
          })
          addData.media.push(Image_details)
          await addData.save()
        }
        user_details.photo_count -= 1

        await user_details.save()

        /**
         * ------------------------------  Push Notification code ------------------------------
         */

        const Album_members = await UserAlbum.find({ _id: Album_Id }).select(
          '-_id album_members'
        )

        let user_ids = [] // get all member_id of this albums
        for (let i = 0; i < Album_members[0].album_members.length; i++) {
          if (Album_members[0].album_members[i] != userid) {
            user_ids.push(Album_members[0].album_members[i])
          }
        }

        const User_device_token = await userDevices
          .find({ user_id: user_ids })
          .select('device_token')
        const device_tokens = []
        for (let i = 0; i < User_device_token.length; i++) {
          if (User_device_token[i]._id != userid) {
            device_tokens.push(User_device_token[i].device_token)
          }
        }

        const send_photo_album = await AlbumPhotos.findOne({album_id: Album_Id})
        console.log(send_photo_album)
        const payload = {
          image:send_photo_album.media[0].image,
          photo_uplode_time:send_photo_album.media[0].photo_uplode_time,
          username:send_photo_album.media[0].username,
          profile_photo:send_photo_album.media[0].profile_photo,
          album_id:send_photo_album.album_id,
          type: 4
        }
        const message_title = 'Arkive'
        const message_text = `${user_details.full_name} took a photo in ${send_photo_album.album_name}`
        send_fcm_notifications(message_title, message_text, device_tokens, payload)

        // After 10 min
        setTimeout(() => {
          const message_title = 'Arkive'
          const message_text = `${user_details.full_name} photo is ready in ${send_photo_album.album_name}!`
          send_fcm_notifications(message_title, message_text, device_tokens,payload)
        }, 600000)

        /**
         * ------------------------------  Push Notification code ------------------------------
         */

        res
          .status(200)
          .send(Helper.responseWithoutData(true, responseCode.OK, 'success'))
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.UNAUTHORIZED,
              'You have no credite to take a photo, please tyr on monday at 9 AM'
            )
          )
      }
    } catch (error) {
      res.status(200).send(
        Helper.responseWithoutData(
          false,
          responseCode.INTERNAL_SERVER_ERROR,
          // 'Something went wrong'
          error.message
        )
      )
    }
  }


  async getalbumDetails (req, res) {
    try {
      const Requestbody = req.body._id
      const userid = req.token_payload.UserData._id
      const findAlbum = await AlbumPhotos.find({ album_id: Requestbody })
      /**
       * get album members
       */
      const albumdetails = await AlbumPhotos.find({ album_id: Requestbody })
        .populate({ path: 'album_id', select: 'album_name album_members' })
        .select('media -_id')

      let media = []
      for (let i = albumdetails[0].media.length - 1; i >= 0; i--) {
        let media_details = {
          _id: albumdetails[0].media[i]._id,
          image: awsconfig.BASEURL_ALBUM + albumdetails[0].media[i].image,
          photo_uplode_time: albumdetails[0].media[i].photo_uplode_time,
          username: albumdetails[0].media[i].username,
          profile_photo:
            awsconfig.BASEURL_PROFILE + albumdetails[0].media[i].profile_photo
        }
        media.push(media_details)
      }

      // const aa = await AlbumPhotos.aggregate([
      //   { $match: { album_id:  "627a0d16a10ac99de5d5d240"  } },
      //   // {
      //   //   $lookup:{
      //   //     from: "album_id",
      //   //     localField: "media",
      //   //     foreignField: "media",
      //   //     as: "media"
      //   //   },
      //   //   // $project:{
      //   //   //   album_name : 1,
      //   //   //   album_members: 1
      //   //   // }
      //   // },
      //   // {
      //   //   $project:{
      //   //     media : 1
      //   //   }
      //   // }
      // ])

      // const album_members_full_details = await user.find({_id:albumdetails[0].album_id.album_members}).select('_id full_name username profile_photo')
      const album_members_full_details = await user.aggregate([
        { $match: { _id: { $in: albumdetails[0].album_id.album_members } } },
        {
          $project: {
            _id: 1,
            username: 1,
            full_name: 1,
            // profile_photo:{$cond:{if:'$profile_photo'==null,then:{$concat:[awsconfig.BASEURL_PROFILE , '$profile_photo']},else:"null"}},
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      /**
       * Get remaining friends so we can we add them in our album
       */
      let friend_ids = []

      const album_members_ids = albumdetails[0].album_id.album_members

      const friends1 = await UserFriend.find({
        from_user_id: userid,
        request_status: 1
      }).select('to_user_id -_id')

      const friends2 = await UserFriend.find({
        to_user_id: userid,
        request_status: 1
      }).select('from_user_id -_id')

      for (let i = 0; i < friends1.length; i++) {
        friend_ids.push(friends1[i].to_user_id)
      }
      for (let i = 0; i < friends2.length; i++) {
        friend_ids.push(friends2[i].from_user_id)
      }

      let remaing_friend = []

      friend_ids = friend_ids.filter(function (val) {
        return album_members_ids.indexOf(val) == -1
      })

      const friends = await user.aggregate([
        { $match: { _id: { $in: friend_ids } } },
        {
          $project: {
            _id: 1,
            username: 1,
            full_name: 1,
            //profile_photo:{$cond:{if:'$profile_photo'!==null,then:{$concat:[awsconfig.BASEURL_PROFILE , '$profile_photo']},else:"null"}},
            profile_photo: {
              $concat: [awsconfig.BASEURL_PROFILE, '$profile_photo']
            }
          }
        }
      ])

      if (albumdetails != null) {
        const finalAlbumDetail = {
          album_id: Requestbody,
          album_name: albumdetails[0].album_id.album_name,
          album_members: albumdetails[0].album_id.album_members.length,
          media: media,
          members_details: album_members_full_details,
          other_friends_details: friends
        }
        res
          .status(200)
          .send(
            Helper.responseWithData(
              true,
              responseCode.OK,
              'Success',
              finalAlbumDetail
            )
          )
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              'Album not found'
            )
          )
      }
    } catch (error) {
      res.status(200).send(
        Helper.responseWithoutData(
          false,
          responseCode.INTERNAL_SERVER_ERROR,
          // responseMessage.INTERNAL_SERVER_ERROR
          'Something went wrong'
        )
      )
    }
  }



  async Managemembers (req, res) {
    try {
      /**
       *  * * * * * * * * * *  * * *  * * * * * * * *  * * * * *  Find total friends  * * * * * * * * * *  * * *  * * * * * * * *  * * * * *
       */
      // const userid = req.token_payload.UserData._id;
      const userid = '625ffb683629818fddd773dd'
      // const Requestbody = req.body; // album_id
      const Requestbody = {
        album_id: '6272014aca1e487991749bd3'
      }
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

      const albummembers = await UserAlbum.findById(
        Requestbody.album_id
      ).select('-_id album_members')

      const friends = await user
        .find({ _id: data })
        .select('_id full_name username profile_photo')

      /**
       *  * * * * * * * * * *  * * *  * * * * * * * *  * * * * *  Find total Album members  * * * * * * * * * *  * * *  * * * * * * * *  * * * * *
       */
    } catch (error) {
      res.send(error.message)
    }
  }


  async RemovePhoto (req, res) {
    try {
      // const userid = req.token_payload.UserData._id
      // console.log("==========>>",userid)
      const Requestbody = req.body // iamge - id, album_id
      const find_and_remove = await AlbumPhotos.findOne({
        album_id: Requestbody.album_id
      })

      if (find_and_remove) {
        for (let i = 0; i < find_and_remove.media.length; i++) {
          if (find_and_remove.media[i]._id == Requestbody.image_id) {
            find_and_remove.media[i].remove(find_and_remove.media[i]._id)
            await find_and_remove.save()
          }
        }
        res
          .status(200)
          .send(Helper.responseWithoutData(true, responseCode.OK, 'Success'))
      } else {
        res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              'Not Found'
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
            'Something went wrong'
          )
        )
    }
  }

  
}

module.exports = new Album()
