const { ctrlWrapper } = require("../../helpers");

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = ctrlWrapper(current);
