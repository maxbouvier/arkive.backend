const { body, check } = require("express-validator");

module.exports = function validate(methodName) {
  switch (methodName) {
    case "login": {
      return [
        body("mobile_number")
          .notEmpty()
          .withMessage("Mobile number field is required")
          .isInt()
          .withMessage("Mobile number must be numeric only")
          .isLength({ min: 10 })
          .withMessage("Mobile number must be 10 characters long")
          .isLength({ max: 15 })
          .withMessage("Mobile number must be 22 characters long"),
      ];
    }

    default: {
      return [body("invalid Method")];
    }
  }
};
