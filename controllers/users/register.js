const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: ` <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = ctrlWrapper(register);
