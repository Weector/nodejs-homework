const createHttpError = require("http-errors");
const { ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const resendingEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw createHttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user.verify) {
    const resendEmail = {
      to: email,
      subject: "Verify email",
      html: ` <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify your email</a>`,
    };

    await sendEmail(resendEmail);
  }

  if (user.verify) {
    throw createHttpError(400, "Verification has already been passed");
  }

  res.json({ message: "Verification email sent" });
};

module.exports = ctrlWrapper(resendingEmail);
