const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.JoiSchema), ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateBody(schemas.JoiSchema), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.favoriteJoiSchema),
  ctrl.updateStatusContact
);

module.exports = router;
