const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const { statistic: ctrl } = require('../../controllers');

router.get('/', guard, ctrl.getStatistics);

module.exports = router;