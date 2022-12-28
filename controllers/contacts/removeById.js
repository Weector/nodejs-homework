const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = ctrlWrapper(removeById);
