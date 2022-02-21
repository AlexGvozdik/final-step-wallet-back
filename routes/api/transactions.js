const express = require('express');
const router = express.Router();
const { transactions } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { joiSchema } = require('../../models/transaction');

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(transactions.addTransaction),
);

router.get(
  '/',
  authenticate,
  controllerWrapper(transactions.getAllTransactions),
);

router.post(
  '/statistics',
  authenticate,
  controllerWrapper(transactions.getStatistics),
);

router.post(
  '/expense',
  authenticate,
  controllerWrapper(transactions.getExpense),
);

router.post('/income', authenticate, controllerWrapper(transactions.getIncome));

module.exports = router;