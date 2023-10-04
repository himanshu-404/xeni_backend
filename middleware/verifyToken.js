const AppError = require("../utils/appError");
const { responseError } = require("../utils/commonFunctions");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      throw new AppError("Invalid Token", 401);
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          throw new AppError(err.message, 401);
        }
        return decoded;
      }
    );

    req.userId = decoded.id;

    next();
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { verifyToken };
