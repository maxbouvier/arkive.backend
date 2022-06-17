const jwt = require("jsonwebtoken");

class Helper {
  responseWithData(
    responseStatus,
    responseCode,
    responseMessage,
    responseData
  ) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
      responseData: responseData,
    };
  }
  responseWithoutData(responseStatus, responseCode, responseMessage) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
    };
  }

  generate_Token(payload) {
    return jwt.sign(
      {
        UserData: payload,
      },
      `${process.env.JWT_SECRETKEY}`,
      {
        expiresIn: "1d",
      }
    );
  }

  Generate_random_string(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  RearrangContact(contacts, mobile_number, full_number) {
    const updateContact = [];
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i] == null) {
        continue;
      } else {
        // const dd = contacts[i].replace(/\s+/g, "").replace("(", "").replace(")","").replace("-", "");
        const dd = contacts[i]
          .replace(/[&\/\\#,()$~%.'":*?<>{}-]/g, "")
          .split(" ")
          .join("");
        if (dd == mobile_number || dd == full_number) {
          continue;
        } else {
          updateContact.push(dd);
        }
      }
    }
    return updateContact;
  }
}

module.exports = new Helper();
