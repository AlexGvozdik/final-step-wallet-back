const { Transaction } = require('../../models/transaction');
const { User } = require('../../models/user');

const addTransaction = async (req, res) => {
  const transaction = { ...req.body, owner: req.user._id };
  let balanceState = 0;
  if (transaction.type === 'expense') { // calculates the state of the balance after the current transaction, depending on the type of the transaction
    balanceState = req.user.currentBalance - transaction.amount;
  };
  if (transaction.type === 'income') {
    balanceState = Number(req.user.currentBalance) + Number(transaction.amount);
  }
  const currentBalance = balanceState;
  await User.findByIdAndUpdate(req.user._id, { currentBalance }); // updates the current balance of the user in users collection

  const newTransaction = { ...req.body, balanceState, owner: req.user._id };
  const result = await Transaction.create(newTransaction);
  res.status(201).json({
    status: 'success',
    code: 201,
    result
  });
};

module.exports = addTransaction;