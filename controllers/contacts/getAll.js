const { listContacts } = require("../../models/contacts");
const createError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const result = await listContacts();

  if (!result.length) {
    throw createError(404, "Contacts list is empty.");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(getAll);
