const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String, required: true },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemas = { joiRegisterSchema, joiLoginSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
