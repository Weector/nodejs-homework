const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const avatarURL = gravatar.url(email);
  console.log(avatarURL);

  await User.create({ password: hashPassword, email, subscription, avatarURL });

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = ctrlWrapper(register);
