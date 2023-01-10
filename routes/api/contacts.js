const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validateBody, auth } = require("../../middelwares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, validateBody(schemas.JoiSchema), ctrl.add);

router.delete("/:contactId", auth, ctrl.removeById);

router.put(
  "/:contactId",
  auth,
  validateBody(schemas.JoiSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(schemas.favoriteJoiSchema),
  ctrl.updateStatusContact
);

module.exports = router;
