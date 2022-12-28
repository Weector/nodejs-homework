const createError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const result = await Contact.find({});

  if (!result.length) {
    throw createError(200, "Contacts list is empty.");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(getAll);
