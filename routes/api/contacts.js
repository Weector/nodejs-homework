const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validateBody } = require("../../middelwares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.contactsSchema), ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put(
  "/:contactId",
  validateBody(schemas.contactsSchema),
  ctrl.updateById
);

module.exports = router;
