const express = require('express');
const router = express.Router();
const { users } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { balanceSchema } = require('../../models/user');

router.get('/current', authenticate, controllerWrapper(users.getCurrentUser));

// router.patch(
//   '/balance',
//   authenticate,
//   validation(balanceSchema),
//   controllerWrapper(users.updateBalance),
// );

router.get(
  '/balance',
  authenticate,
  controllerWrapper(users.getCurrentBalance),
);

module.exports = router;