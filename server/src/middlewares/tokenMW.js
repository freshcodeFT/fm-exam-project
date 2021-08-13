const JwtService = require('../services/jwtService');
const createHttpError = require('http-errors');

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;

    req.tokenData = await JwtService.verifyRefreshToken(refreshToken);

    next();
  } catch (error) {
    console.log(error);
    next(createHttpError(401, 'Wrong refresh token'));
  }
};

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization: accessToken },
    } = req;

    if (accessToken) {
      req.tokenData = await JwtService.verifyAccessToken(accessToken);
      return next();
    }
    next(createHttpError(419, 'Need token'));
  } catch (error) {
    next(error);
  }
};
