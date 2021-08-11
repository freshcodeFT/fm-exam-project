const createHttpError = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      return res.send({ data });
    }
    next(createHttpError(401, 'Invalid credentials'));
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthService.createSession(user);
      return res.send({ data });
    }
    next(createHttpError(406, 'User already exists'));
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken }, // refresh token is not expired
    } = req;

    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        value: refreshToken,
      },
    });

    const data = await AuthService.refreshSession(refreshTokenInstance);

    res.send({ data });
  } catch (error) {
    next(error);
  }
};
