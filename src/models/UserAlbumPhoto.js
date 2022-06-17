const mongoose = require("mongoose");

const UserAlbumPhotosSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAlbum",
    },
    media: [
      {
        image: {
          type: String,
        },
        photo_uplode_time: {
          type: Number,
        },
        username: {
          type: String,
        },
        profile_photo: {
          type: String,
        },
      },
    ],
    media_type: {
      type: String,
    },

    deleted_at: {
      type: Number,
    },
  },
  { timestamps: true }
);

const AlbumPhotos = mongoose.model("AlbumPhotos", UserAlbumPhotosSchema);
module.exports = AlbumPhotos;
