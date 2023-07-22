const { body } = require('express-validator');

const photoInsertValidation = () => {
  return [
    body('title')
      .not()
      .equals('undefined')
      .withMessage('Title is required')
      .isString()
      .withMessage('Title must be a string')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image is required');
      }
      return true;
    }),
  ]
};

const photoUpdateValidation = () => {
  return [
    body('title')
      .optional()
      .isString()
      .withMessage('Title must be a string')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long'),
  ]
};

const commentValidation = () => {
  return [
    body('comment')
      .isString()
      .withMessage('Comment must be a string'),
  ]
}

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation
};