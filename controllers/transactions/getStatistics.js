const { Transaction } = require('../../models/transaction');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');

const getStatistics = async (req, res) => {
  const { _id } = req.user;
  const filter = { owner: _id };
  const allTransactions = await Transaction.find(filter).populate('owner', 'email');

  const { startDate, endDate } = req.body; // must come in format 2021-11-10T00:00:00.000Z
  // const startPoint = new Date(startDate).getTime();
  // const endPoint = new Date(endDate).getTime();
  const startPoint = new Date(moment(startDate.slice(0,7)).startOf('month'));
const endPoint = new Date(moment(endDate.slice(0,7)).endOf('month'));

  // const result = allTransactions.filter((transaction) => {
  //   const transactionTime = new Date(transaction.date).getTime();
  //   return transactionTime >= startPoint && transactionTime <= endPoint;
  // });
  const result =  await Transaction.aggregate([
    {
      $match: {
        owner: ObjectId(_id),
        type: 'income',
        date : 
            { $gte:startPoint, //тут указываете с какого числа месяца 
              $lt: endPoint, //по какое число месяца. 
            },
      },
    },
    {
      $group: {
        _id: { category: "$category" },
        totalSum: { $sum: "$amount" },
      },
    },
    {
      $project: { _id: 0, category: "$_id.category", totalSum: "$totalSum" },
    },
  ]);


  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = getStatistics;