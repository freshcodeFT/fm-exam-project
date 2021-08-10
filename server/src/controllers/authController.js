const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  MAX_DEVICE_AMOUNT,
} = require('../constants');

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
      headers: { ['user-agent']: userAgent },
    } = req;
    /* Find user */
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await user.comparePassword(password))) {
      /* Create tokenPair */
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_TIME,
        },
      );

      const refreshToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: REFRESH_TOKEN_TIME,
        },
      );
      if ((await user.countRefreshTokens()) >= MAX_DEVICE_AMOUNT) {
        const [oldestToken] = await user.getRefreshTokens({
          order: [['updatedAt', 'ASC']],
          limit: 1,
        });
        await oldestToken.update({ value: refreshToken, ua: userAgent });
      } else {
        await user.createRefreshToken({ value: refreshToken, ua: userAgent });
      }
      res.send({
        data: {
          user,
          tokenPair: {
            access: accessToken,
            refresh: refreshToken,
          },
        },
      });
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
    //...
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    // refresh
  } catch (error) {
    next(error);
  }
};
