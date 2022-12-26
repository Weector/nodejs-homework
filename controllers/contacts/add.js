const { addContact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const add = async (req, res, next) => {
  const { body } = req;

  const result = await addContact(body);

  res.status(201).json({
    status: "created",
    code: 201,
    data: { result },
  });
};

module.exports = ctrlWrapper(add);
