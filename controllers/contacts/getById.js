const { getContactById } = require("../../models/contacts");
const createError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(getById);
