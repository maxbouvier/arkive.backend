const mongoose = require("mongoose");
const { type } = require("os");
const user = require("./User");

const UserFriendsSchema = new mongoose.Schema(
  {
    from_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    to_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    request_status: {
      type: Number, //1 = accept, 0 = pending, 2 =. reject
    },

    response_at: {
      type: Number,
    },
  },
  {
    timeStamp: true,
  }
);

UserFriendsSchema.virtual("request_id").get(function () {
  return this._id;
});

const UserFriend = mongoose.model("UserFriend", UserFriendsSchema);
module.exports = UserFriend;
