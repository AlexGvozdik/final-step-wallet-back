const { InternalServerError } = require("http-errors")
const { Transaction } = require("../../models")

const get = async (req, res, next) => {
  let transactionsData
  
  if (req.body.year && req.body.month) {
    transactionsData = await Transaction.find({ owner: req.user._id, month: req.body.month, year: req.body.year })
  } else if (req.body.year && !req.body.month) {
    transactionsData = await Transaction.find({ owner: req.user._id, year: req.body.year })
  } else {
    transactionsData = await Transaction.find({ owner: req.user._id })
  }

  if (!transactionsData) throw new InternalServerError("Server error")

  transactionsData = transactionsData.map((transactionData) => ({
    id: transactionData._id,
    day: transactionData.day,
    month: transactionData.month,
    year: transactionData.year,
    type: transactionData.type,
    category: transactionData.category,
    comment: transactionData.comment,
    sum: transactionData.sum,
    balance: transactionData.balance,
  }))

  res.json({
    status: "Transactions retrieved",
    code: 200,
    data: {
      transactionsData,
    },
  })
}

module.exports = get;