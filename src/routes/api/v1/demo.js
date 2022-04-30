const express = require('express')
const auth = require('../../../middlewares/auth')
const validator = require('../../../middlewares/validator.js')

const route = express.Router()
const UserAuthentication = require('../../../controllers/api/v1/UserAuthenticationController')
const UserProfile = require('../../../controllers/api/v1/UserProfile')
const Usercontacts = require('../../../controllers/api/v1/UserContactsController')
const Friends = require('../../../controllers/api/v1/UserFriendsController')

// route.get('/demo', Friends.demo)

route.use(auth.validateApiKey)
/**
 * UserAuthenticationController.js Controller API routing
 */

route.post('/login', validator('login'), UserAuthentication.Userlogin)
route.post('/verify-otp', UserAuthentication.UserOTPVerification)

route.post('/resend-otp', UserAuthentication.ResendOTP)
/**
 *    VERIFICATION TOKEN 
 */
route.use(auth.verifyjwtToken)




route.post('/logout', UserAuthentication.UserLogout)

/**
 * UserProfile.js Controller API routing
 */
route.post('/user-profile', UserProfile.UserProfile)
route.post('/edit-user-profile', UserProfile.UserProfile)

/**
 * User Contacts get API routing
 */
route.post('/user-contacts', Usercontacts.Getusercontacts)

/**
 * User friend Request API routing
 */

route.post('/add-friend-request', Friends.UserFriendRequestSend)
route.post('/accept-friend-request', Friends.UserFriendRequestAccpet)

module.exports = route
