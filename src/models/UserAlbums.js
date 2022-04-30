const mongoose = require('mongoose')

const UserAlbumSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    user_id: {
      type: String,
      ref: 'Event'
    },
    uuid: {
      type: String
    },
    name: {
      type: Number
    },
    display_photo: {
      type: String
    },
    deleted_at: {
      type: Number
    }
  },
  {
    timeStamp: true
  }
)

const user_album = new mongoose.model('user_album', UserAlbumSchema)
