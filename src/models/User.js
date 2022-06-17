const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    country_isd_code: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      minlength: 10,
      maxlength: 15,
      required: true,
    },
    full_number: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otp_expire_at: {
      type: String,
    },
    full_name: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    profile_photo: {
      type: String,
      default: "null",
    },
    profile_created: {
      type: String,
    },
    profile_completed: {
      type: Boolean,
      default: false, // false  = 0, true = 1
    },
    photo_count: {
      type: Number, // Increment by 1 when any image will add
      default: 10,
    },
    user_exist: {
      type: Boolean,
      default: false, // false  = 0, true = 1
    },
    is_active: {
      type: Boolean,
      default: 0, // InActive = 0, Active = 1
    },
    deleted_at: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", UserSchema);
module.exports = user;
