const mongoose = require('mongoose')
const user = require('./User');

const UserAlbumMembers = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user
    },
    friends:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: user
    }],
    is_admin: {
      type: Number
    },
    deleted_at: {
      type: Number
    }
  },
  { timestamps: true }
)

const user_album_members = new mongoose.model(
  'user_album_members',
  UserAlbumMembers
)
