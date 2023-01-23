const express = require("express");

const { users: ctrl } = require("../../controllers");
const { validateBody, upload } = require("../../middelwares");
const { schemas } = require("../../models/user");
const { auth } = require("../../middelwares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", ctrl.resendingEmail);

router.post("/login", validateBody(schemas.joiLoginSchema), ctrl.login);

router.post("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
