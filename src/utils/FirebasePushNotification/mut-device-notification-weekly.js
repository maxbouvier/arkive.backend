const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cron = require("node-cron");
const user = require("../../models/User");

// send_fcm_notifications()
async function Weekly_Notification(userid, title, text, user_tokens,payload_data) {
  cron.schedule("0 9 * * MON", function () {
 
    var fcm_tokens = user_tokens
    var message = {
      registration_ids: fcm_tokens,
      notification: {
        title: "Arkive",
        body: text,
        // data: payload_data
      },  
      data: payload_data
    }

    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        // replace authorization key with your key
        Authorization:
          "key=" +
          "AAAAw5A8ERc:APA91bEKC-2LYxZyGYWSmIjrZLJaOSlZsnVaEi5crBzbOB9KGgvbDUXGlXEh4iwQQtFojft7tEZVe8k7iV7SDf3zZn_qAlwHn20_XxAhO5ObUPrrEuc2Ts--dNp3czLdBoZXDV5X2Ufy",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then(async function (response) {
        const photoCount = await user.findByIdAndUpdate(
          userid,
          { photo_count: 10 },
          { new: true }
        );
        console.log("Yes");
      })
      .catch(function (error) {
        console.error("No");
      });
  });

  // const photoCount =  user.findByIdAndUpdate(userid, {photo_count : 0}, {new : true});
}

module.exports = Weekly_Notification;
