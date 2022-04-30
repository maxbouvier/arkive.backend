const mongoose = require('mongoose')

const UserDeviceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
      // type: String
    },

    device_token: {
      type: String
    },
    device_name: {
      type: String
    },
    device_version: {
      type: String
    },
    token: {
      type: String
    },
    created_at: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
    deleted_at: {
      type: Number
    }
  },
  {
    timeStamps: true
  }
)

const userDevices = mongoose.model('user_devices', UserDeviceSchema)
module.exports = userDevices
