const express = require("express");

const { users: ctrl } = require("../../controllers");
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/user");
const { auth } = require("../../middelwares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.joiLoginSchema), ctrl.login);

router.post("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

module.exports = router;
