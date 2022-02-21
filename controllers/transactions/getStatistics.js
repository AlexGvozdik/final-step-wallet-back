const { Transaction } = require('../../models/transaction');

const getStatistics = async (req, res) => {
  const { _id } = req.user;
  const filter = { owner: _id };
  const allTransactions = await Transaction.find(filter).populate('owner', 'email');

  const { startDate, endDate } = req.body; // must come in format 2021-11-10T00:00:00.000Z
  const startPoint = new Date(startDate).getTime();
  const endPoint = new Date(endDate).getTime();

  const result = allTransactions.filter((transaction) => {
    const transactionTime = new Date(transaction.date).getTime();
    return transactionTime >= startPoint && transactionTime <= endPoint;
  });

  res.json({
    status: 'success',
    code: 200,
    result,
    quantity: result.length
  });
};

module.exports = getStatistics;