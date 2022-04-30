const mongoose = require('mongoose')

const UserAlbumPhotosSchema = new mongoose.Schema({
  id: {
    type: String
  },
  album_id: {
    type: String
  },
  media: {
    type: String
  },
  user_id: {
    type: Number
  },
  media_type : {
    type: String
  },

  deleted_at: {
    type: Number
  }

},
{ timestamps: true }
)

const user_album_photos = new mongoose.model('user_album_photos', UserAlbumPhotosSchema)
