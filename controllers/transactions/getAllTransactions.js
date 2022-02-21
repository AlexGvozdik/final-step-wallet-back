const { Transaction } = require('../../models/transaction');

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;
  const filter = { owner: _id };
  const transactions = await Transaction.find(filter, '')
    .sort([['date', -1]])
    .populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    transactions,
    quantity: transactions.length,
  });
};

module.exports = getAllTransactions;