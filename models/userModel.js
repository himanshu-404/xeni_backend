const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

const UserModel = new mongoose.model("user", userSchema);
module.exports = UserModel;
