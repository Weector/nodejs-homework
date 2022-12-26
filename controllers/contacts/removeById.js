const { removeContact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await removeContact(contactId);
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = ctrlWrapper(removeById);
