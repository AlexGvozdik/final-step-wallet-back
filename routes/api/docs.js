const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");

const router = express.Router();

router.use("", swaggerUI.serve);
router.get("", swaggerUI.setup(swaggerDocument));

module.exports = router;