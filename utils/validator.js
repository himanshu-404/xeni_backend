const Joi = require("joi");

const validateSchema = (req, res, next, schema, type) => {
  const types = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  const validate = schema.validate(types[type]);

  if (!validate.error) return next();

  return res.status(400).json({
    status: false,
    message: validate.error.details.map((i) => i.message).join(","),
    data: null,
  });
};

const schema = {
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  registerSchema: Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
        )
      )
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit and one special character.",
      }),
  }),
};

module.exports = {
  validateSchema,
  schema,
};
