const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const { userTransactions: ctrl } = require('../../controllers');

router.get('/', guard, ctrl.getCategories);

module.exports = router;