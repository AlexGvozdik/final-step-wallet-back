const express = require("express")

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares")
const { joiBalanceSchema } = require("../../models/user")
const { users: ctrl } = require("../../controllers")

const router = express.Router()

router.patch(
  "/balance",
  authenticate,
  validation(joiBalanceSchema),
  controllerWrapper(ctrl.updateBalance)
)

router.get(
  "/balance",
  authenticate,
  controllerWrapper(ctrl.getBalance)
)

module.exports = router