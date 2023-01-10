const createError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit,
  }).populate("owner", "email");

  if (!result.length) {
    throw createError(200, "Contacts list is empty.");
  }

  if (req.query)
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
};

module.exports = ctrlWrapper(getAll);
