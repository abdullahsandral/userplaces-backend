const jwt = require('jsonwebtoken');

const HttpError = require('../modals/HTTP-Error');

module.exports = (req, res, next) => {
  try {
    //console.log(req.headers)
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return next(new HttpError('AUTHENTICATION Failed', 401));

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (error) {
    return next(new HttpError('AUTHENTICATION Failed due to Header', 401));
  }
};
