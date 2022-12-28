const createError = require("http-errors");
const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw createError(404, `Not found contact with id: ${contactId}`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(getById);
