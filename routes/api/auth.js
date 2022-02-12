const express = require("express");

const { controllerWrapper, validation } = require("../../middlewares");
const { authenticate } = require("../../middlewares");
const { joiRegistrationSchema, joiLoginSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegistrationSchema),
  controllerWrapper(ctrl.register)
);

router.get("/current", authenticate, controllerWrapper(ctrl.getUser));

router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(ctrl.login)
);

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;