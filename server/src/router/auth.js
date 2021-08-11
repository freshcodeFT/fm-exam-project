const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const validators = require('../middlewares/validators');

authRouter.post('/sign-in', validators.validateLogin, AuthController.signIn);
authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  AuthController.signUp,
);
authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
