const {
  handelRegisterUser,
  handelLoginUser,
  handelGetUserInfo,
  handelUpdateUser,
} = require("../services/userServices");
const { responseError, responseSuccess } = require("../utils/commonFunctions");

const registerUser = async (req, res) => {
  try {
    const result = await handelRegisterUser(req.body);
    return responseSuccess(res, 200, result, "User registered successfully");
  } catch (error) {
    return responseError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await handelLoginUser(req.body);
    return responseSuccess(res, 200, result, "User Login successfully");
  } catch (error) {
    return responseError(res, error);
  }
};
const updateUser = async (req, res) => {
  try {
    const result = await handelUpdateUser({
      ...req.body,
      userId: req.userId,
    });
    return responseSuccess(res, 200, result, "User Updated successfully");
  } catch (error) {
    return responseError(res, error);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const result = await handelGetUserInfo(req.userId);
    return responseSuccess(res, 200, result);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
};
