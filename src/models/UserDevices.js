const mongoose = require("mongoose");

const UserDeviceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    device_type: {
      type: Number, // 0 - ios / 1 - Android
    },
    device_token: {
      type: String,
    },
    device_name: {
      type: String,
    },
    device_version: {
      type: String,
    },
    unique_token: {
      type: String,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deleted_at: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);

const userDevices = mongoose.model("userDevices", UserDeviceSchema);
module.exports = userDevices;
