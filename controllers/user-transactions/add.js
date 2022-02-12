const { InternalServerError, BadRequest } = require("http-errors");
const { Transaction } = require("../../models");
const { User } = require("../../models");

const add = async (req, res) => {
  const userData = await User.findById(req.user._id);

  let newBalance = 0;

  req.body.type
    ? (newBalance = userData.balance + req.body.sum)
    : (newBalance = userData.balance - req.body.sum);

  if (newBalance < 0) throw new BadRequest("The balance cannot be less than 0");

  const newTransaction = {
    ...req.body,
    balance: newBalance,
    owner: req.user._id,
  };

  let transactionData = await Transaction.create(newTransaction);

  if (!transactionData) throw new InternalServerError("Server error");

  const newUserData = await User.findByIdAndUpdate(
    req.user._id,
    { balance: newBalance },
    { new: true }
  );
  if (!newUserData) throw new InternalServerError("Server error");

  transactionData = {
    id: transactionData._id,
    day: transactionData.day,
    month: transactionData.month,
    year: transactionData.year,
    type: transactionData.type,
    category: transactionData.category,
    comment: transactionData.comment ? transactionData.comment : "",
    sum: transactionData.sum,
    balance: transactionData.balance,
  };

  res.status(201).json({
    status: "Transaction created, Balance updated",
    code: 201,
    data: {
      transactionData,
    },
  });
};

module.exports = add;