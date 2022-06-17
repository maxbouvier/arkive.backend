const express = require("express");
const auth = require("../../../middlewares/auth");
const validator = require("../../../middlewares/validator.js");

const route = express.Router();
const UserAuthentication = require("../../../controllers/api/v1/UserAuthenticationController");
const UserProfile = require("../../../controllers/api/v1/UserProfile");
const UserDetails = require("../../../controllers/api/v1/UserContactsController");
const Friends = require("../../../controllers/api/v1/UserFriendsController");
const Album = require("../../../controllers/api/v1/UserAlbum");

/**
 * For get the info of actual data base - usefull for UI developer
 */
route.get("/allUsers", UserDetails.getallusers);
route.post("/deleteuser", UserAuthentication.deleteUser);
route.post("/deletecollection", UserAuthentication.deletecollection);

route.use(auth.validateApiKey);

/**
 * UserAuthenticationController.js Controller API routing
 */

route.post("/login", validator("login"), UserAuthentication.Userlogin);
route.post("/verify-otp", UserAuthentication.UserOTPVerification);
route.post("/resend-otp", UserAuthentication.ResendOTP);
/**
 *    VERIFICATION TOKEN
 */
route.use(auth.verifyjwtToken);

route.post("/logout", UserAuthentication.UserLogout);

/**
 * UserProfile.js Controller API routing
 */
route.post("/user-profile", UserProfile.UserProfile);
route.post("/edit-user-profile", UserProfile.UserProfile);

/**
 * User Contacts, Friends, Pending request  get API routing
 */
route.post("/contacts", Friends.Contacts);
route.get("/user-friends", Friends.getFriends);

/**
 * User friend Request API routing
 */
route.post("/friend-request", Friends.UserFriendRequestSend);
route.post("/friend-response", Friends.UserFriendRequestAccpetDenied);

route.put("/remove-friend", Friends.RemoveFriend);

/**
 * User Album API routing
 */

route.post("/create-album", Album.CreateAlbum);
route.put("/update-album", Album.UpdateAlbum);
route.post("/delete-album", Album.DeleteAlbum);
route.get("/user-albums", Album.getUserAlbums);
route.post("/add-photo", Album.sendImage);
route.post("/user-albums-details", Album.getalbumDetails);
route.post("/delete-photo", Album.RemovePhoto);

module.exports = route;
