const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const transactiosRouter = require("./routes/api/transactions");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/transactions", transactiosRouter);
app.use("/api/users", usersRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({
    status: "Error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "Error",
    code: status,
    message,
  });
});

module.exports = app;