const express = require("express");
const guard = require("../../helpers/guard");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/transaction");
const { userTransactions: ctrl } = require("../../controllers");
const { statistic: secondCtrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/add",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.post("/get", authenticate, controllerWrapper(ctrl.get));
router.get('/statistics', guard, secondCtrl.getStatistics);

module.exports = router;