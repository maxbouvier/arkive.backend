const Twilio = require('twilio');

class Twilio_Service {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  

  UserVirifyBySMS (number, otp) {
      console.log("test_twillio")
      
    let accountSid = 'AC7ffa505f85a5b1771ecd28654eda2df7'
    let token = 'aa09d7d0ffc18a6f076514bde62558b0'
    let client = new Twilio(accountSid, token)

    client.messages
      .create({
        body: `your OTP is ${otp}`,
        from: '+19107255962',
        to: `+91${number}`
      })
      .then(message => console.log(message.sid))
      .catch(err => {
        console.log('error', err)
      })
  }
}

module.exports =  new Twilio_Service()
