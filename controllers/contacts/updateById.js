const createHttpError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw createHttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(updateById);
