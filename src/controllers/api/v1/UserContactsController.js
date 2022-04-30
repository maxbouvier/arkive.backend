const user = require('../../../models/User')
const mongoose = require('mongoose')
const Twilio_Service = require('../../../utils/twillio/userLogin')
const Helper = require('../../../helper/commanFunction')
const responseCode = require('../../../utils/locales/responseCode')
const responseMessage = require('../../../utils/locales/responseMessage')


class Usercontacts {

    async Getusercontacts(req,res){
        
        let contacts  =  [
          "8866813547","1234567890","3214569870","5247854752","2014854744","2","3","4","5","8401686946", "9898797638", "6541235369"
       ];
        try {
         
         const user_contact = await user.find({mobile_number : contacts}).select('_id full_name username profile_photo' )
         res
         .status(200)
         .send(Helper.responseWithData(
           true,
           responseCode.OK,
           responseMessage.OK,
           user_contact
         ))
          
        } catch (error) {
          res
          .status(200)
          .send(Helper.responseWithoutData(
            true,
            responseCode.NOT_FOUND,
            responseMessage.NOT_FOUND,
           
          ))
          
        }
        // const contacts  =  [
        //     "8866813547","1234567890","3214569870","5247854752","2014854744","2","3","4","5"
        //  ];
        //  const user_contact = await user.find({mobile_number : contacts}).select('_id full_name username' )
        //  res.send(user_contact)


        //  for(let i =0;i<contacts.length;i++){
        //      const user_contact_find = await user.fin({mobile_number : contacts[i]});
        //      if(user_contact_find){
        //          user_contacts.push(contacts[i])
        //      }
        //  }

        //  for(let i =0;i<user_contacts.length;i++){
        //      console.log(user_contacts[i])
        //  }
        
    }

    

    
}

module.exports = new Usercontacts();