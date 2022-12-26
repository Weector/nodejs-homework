const { updateContact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  // const { error } = contactsSchema.validate(body);
  // if (error) {
  //   throw createError(400, error.message);
  // }

  res.json({
    status: "success",
    code: 200,
    data: { result: await updateContact(contactId, body) },
  });
};

module.exports = ctrlWrapper(updateById);
