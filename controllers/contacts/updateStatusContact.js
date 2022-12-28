const createHttpError = require("http-errors");
const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!result) {
    throw createHttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = ctrlWrapper(updateStatusContact);
