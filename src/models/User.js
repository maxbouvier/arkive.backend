const mongoose = require('mongoose')
// const uuid = require('uuid');

const { v4: uuidv4 } = require('uuid')
uuidv4()

const UserSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String
    // },
    country_isd_code: {
      type: String,
      required : true
    },
    mobile_number: {
      type: String,
      minlength: 10,
      maxlength: 22,
      required: true
    },
    // user_uuid: {
    //   type: String,
    //   default:  uuidv4()
    // },
    otp: {
      type: Number
    },
    otp_expire_at: {
      type: String
    },
    full_name: {
      type: String
    },
    username: {
      type: String
    },
    profile_photo: {
      type: String,
      default: null
    },
    profile_completed: {
      type: Boolean,
      default: 0 // false  = 0, true = 1
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],

    is_active: {
      type: Boolean,
      default: 0 // InActive = 0, Active = 1
    },

    deleted_at: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

const user = mongoose.model('user', UserSchema)
module.exports = user
