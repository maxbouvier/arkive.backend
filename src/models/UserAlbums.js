const mongoose = require("mongoose");

const UserAlbumSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    album_name: {
      type: String,
    },
    album_members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    display_photo: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    deleted_at: {
      type: Number,
    },
  },
  {
    timeStamp: true,
  }
);

const UserAlbum = mongoose.model("UserAlbum", UserAlbumSchema);
module.exports = UserAlbum;
