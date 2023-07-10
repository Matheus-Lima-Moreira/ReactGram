const { body } = require('express-validator');

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage("Name needs to have at least 3 characters."),
    body('email')
      .isString()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('password')
      .isString()
      .withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage("Password needs to have at least 5 characters."),
    body('passwordConfirmation')
      .isString()
      .withMessage('Password confirmation is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
  ];
};

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('password')
      .isString()
      .withMessage('Password is required')
  ]
}

const userUpdateValidation = () => {
  return [
    body('name')
      .optional()
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter pelo menos 3 caracteres.'),
    body('password')
      .optional()
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter pelo menos 5 caracteres.'),
  ]
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
}

module.exports = {
  userCreateValidation,
  loginValidation,
  getCurrentUser,
  userUpdateValidation
};