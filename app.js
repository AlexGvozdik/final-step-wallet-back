const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const https = require('https');
const CronJob = require('cron').CronJob;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const transactionsRouter = require('./routes/api/transactions');
const categoriesRouter = require('./routes/api/categories');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const options = {
  customCss:
    '.swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus {outline: none}',
};

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options),
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const job = new CronJob('0 */25 6-20 * * *', function () {
  const d = new Date();
  https.get('https://final-step-wallet-back.herokuapp.com/login');
  console.log('Every 25 minutes between 6-20:', d);
});
job.start();

module.exports = app;