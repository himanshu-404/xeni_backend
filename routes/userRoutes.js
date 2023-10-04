const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
} = require("../controllers/userControllres");

const { schema, validateSchema } = require("../utils/validator");

router.post(
  "/register",
  (req, res, next) =>
    validateSchema(req, res, next, schema.registerSchema, "body"),
  registerUser
);
router.post(
  "/login",
  (req, res, next) =>
    validateSchema(req, res, next, schema.loginSchema, "body"),
  loginUser
);

router
  .route("/")
  .get(verifyToken, getUserInfo)
  .post(
    verifyToken,
    (req, res, next) =>
      validateSchema(req, res, next, schema.registerSchema, "body"),
    updateUser
  );

module.exports = router;
