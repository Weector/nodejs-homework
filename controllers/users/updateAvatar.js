const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const createHttpError = require("http-errors");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) throw createHttpError(400, "Avatar not attach");

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  const resizeAvatar = await Jimp.read(tempUpload);
  await resizeAvatar.resize(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = ctrlWrapper(updateAvatar);
