const express = require('express');
const router = express.Router();
const { categories } = require('../../controllers');
const { controllerWrapper } = require('../../middlewares');

router.get('/expense', controllerWrapper(categories.getExpenseCategories));

// router.get('/income', controllerWrapper(categories.getIncomeCategories));

module.exports = router;