const express = require("express");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/transaction");
const { userTransactions: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/add",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.post("/get", authenticate, controllerWrapper(ctrl.get));

module.exports = router;