const UserModel = require("../models/userModel");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const { signJwt } = require("../utils/commonFunctions");

const handelRegisterUser = async (data) => {
  const checkUser = await UserModel.findByEmail(data.email);

  if (checkUser) {
    throw new AppError("User already exists", 400);
  }

  const encryptedPassword = bcrypt.hashSync(data.password, 12);

  const newUser = await UserModel.create({
    ...data,
    password: encryptedPassword,
  });

  return newUser;
};

const handelLoginUser = async (data) => {
  const checkUser = await UserModel.findByEmail(data.email);

  if (!checkUser) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = bcrypt.compareSync(data.password, checkUser.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid password", 400);
  }

  const token = signJwt({ id: checkUser._id });

  return token;
};

const handelGetUserInfo = async (userId) => {
  const checkUser = await UserModel.findById(userId, {
    firstName: 1,
    lastName: 1,
    email: 1,
  });

  if (!checkUser) {
    throw new AppError("User not found", 404);
  }

  return checkUser;
};

const handelUpdateUser = async (data) => {
  const validateUser = await handelGetUserInfo(data.userId);

  if (!validateUser) {
    throw new AppError("User not found", 404);
  }

  const checkUser = await UserModel.findByEmail(data.email);

  if (checkUser && checkUser._id.toString() !== data.userId) {
    throw new AppError("User already exists", 400);
  }

  const encryptedPassword = bcrypt.hashSync(data.password, 12);

  const updatedUser = await UserModel.findByIdAndUpdate(
    data.userId,
    {
      ...data,
      password: encryptedPassword,
    },
    { new: true }
  );

  return updatedUser;
};

module.exports = {
  handelRegisterUser,
  handelLoginUser,
  handelGetUserInfo,
  handelUpdateUser,
};
