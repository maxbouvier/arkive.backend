// const cron = require('node-cron');
// var FCM = require('fcm-node');
// var serverKey = 'AAAAw5A8ERc:APA91bEKC-2LYxZyGYWSmIjrZLJaOSlZsnVaEi5crBzbOB9KGgvbDUXGlXEh4iwQQtFojft7tEZVe8k7iV7SDf3zZn_qAlwHn20_XxAhO5ObUPrrEuc2Ts--dNp3czLdBoZXDV5X2Ufy';
// var fcm = new FCM(serverKey);

// /**
//  * code for sending notification to user at Every Monday at a spcifice time
//  */
// function dd(){
//   cron.schedule("*/5 * * * * *", function(){
//     console.log("DHRUVIN")

// var message = {
// to:'FCMfxlUiC2WQCqBRC6L3CpnUC:APA91bFvjxsL6oXmJE2OxIiGmHW14tag_pDkGgn4xkmrouIhG3W-MT1EGRupCv54GrLX-g2UN6pEHZ3y9I8ZTOdnzaSuMJwKnOknnuFisl8dZ2U8wg2dDorIE6lFWthmDm_GSpFstwX9',
//     notification: {
//         title: 'NotifcatioTestAPP',
//         body: 'new photos added in allbum',
//     },

//     data: { //you can send only notification or only data(or include both)
//         title: 'ok cdfsdsdfsd',
//         body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
//     }

// };

// fcm.send(message, function(err, response) {
//     if (err) {
//         console.log("Something has gone wrong!"+err);
//         console.log("Respponse:! "+response);
//     } else {
//         // showToast("Successfully sent with response");
//         console.log("Successfully sent with response: ", response);
//     }

// });
// })
// }

// module.exports = dd;
