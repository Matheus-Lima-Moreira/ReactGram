const { body } = require('express-validator');

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('Nome é obrigatório.')
      .isLength({ min: 3 })
      .withMessage("Nome precisa ter pelo menos 3 caracteres."),
    body('email')
      .isString()
      .withMessage('Email é obrigatório.')
      .isEmail()
      .withMessage('Email é inválido.'),
    body('password')
      .isString()
      .withMessage('Senha é obrigatória.')
      .isLength({ min: 5 })
      .withMessage("Senha precisa ter pelo menos 5 caracteres."),	
    body('passwordConfirmation')
      .isString()
      .withMessage('Confirmar senha é obrigatório.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas não conferem.');
        }
        return true;
      })
  ];
};

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('Email é obrigatório.')
      .isEmail()
      .withMessage('Email é inválido.'),
    body('password')
      .isString()
      .withMessage('Senha é obrigatória.')
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