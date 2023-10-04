const jwt = require("jsonwebtoken");

const responseError = (res, error) => {
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    data: null,
  });
};

const responseSuccess = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    success: true,
    message: message || "Success",
    data,
  });
};

const signJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  responseError,
  responseSuccess,
  signJwt,
};
