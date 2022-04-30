const { body, check } = require('express-validator')
module.exports = function validate (methodName) {
  switch (methodName) {
    case 'login': {
      return [
        body('mobile_number')
          .notEmpty()
          .withMessage('Mobile num field is required')
            .isLength({ min: 10, max: 22 })
            .withMessage('Mobile num must be 10 to 22 characters long')
          .isMobilePhone()
          .withMessage('Mobile num must be in numeric')
      ]
    }
    case 'saveAnswer': {
      return [
        body('question_uuid')
          .notEmpty()
          .withMessage("question_uuid can't be empty"),
        body('question_uuid')
          .not()
          .isInt()
          .withMessage('question_uuid must have a string'),
        body('question_option_uuid')
          .not()
          .isInt()
          .withMessage('question_option_uuid must have a string'),
        body('question_option_uuid')
          .optional({ checkFalsy: true })
          .isString()
          .withMessage('question_option_uuid field may be empty')
      ]
    }
    case 'saveAnswerApp': {
      return [
        body().isArray(),
        body('*.question_uuid')
          .notEmpty()
          .withMessage("question_uuid can't be empty"),
        body('*.question_uuid')
          .not()
          .isInt()
          .withMessage('question_uuid must have a string'),
        body('*.question_option_uuid')
          .not()
          .isInt()
          .withMessage('question_option_uuid must have a string'),
        body('*.question_option_uuid')
          .optional({ checkFalsy: true })
          .isString()
          .withMessage('question_option_uuid field may be empty')
      ]
    }
    default: {
      return [body('invalid Method')]
    }
  }
}
