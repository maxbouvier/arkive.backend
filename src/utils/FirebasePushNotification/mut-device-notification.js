const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

// send_fcm_notifications()

function send_fcm_notifications(title, text, user_tokens, payload_data) {

  var fcm_tokens = user_tokens

  var message = {
    registration_ids: fcm_tokens,
    notification: {
      title: "Arkive",
      body: text,
    },  
    data: payload_data
  } 
  console.log(message);

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      // replace authorization key with your key
      Authorization:
        'key=' +
        'AAAAw5A8ERc:APA91bEKC-2LYxZyGYWSmIjrZLJaOSlZsnVaEi5crBzbOB9KGgvbDUXGlXEh4iwQQtFojft7tEZVe8k7iV7SDf3zZn_qAlwHn20_XxAhO5ObUPrrEuc2Ts--dNp3czLdBoZXDV5X2Ufy',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
    .then(function (response) {
      // console.log("Yes create album notification send to users");
      console.log('resposne======>>>>', response)
      // console.log(body)
    })
    .catch(function (error) {
      console.error(error.message, 'No')
    })
}

module.exports = send_fcm_notifications