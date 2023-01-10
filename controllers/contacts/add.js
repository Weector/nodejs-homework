const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const add = async (req, res, next) => {
  const { _id } = req.user;

  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "created",
    code: 201,
    data: { result },
  });
};

module.exports = ctrlWrapper(add);
