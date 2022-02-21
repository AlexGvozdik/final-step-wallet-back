// const Transactions = require("../../repository/transactions");
// const {Transaction}=require("../../models")
// const getStatistics = async ({ user: { id }, query }, res) => {
//   const amountMoney = array => array.reduce((acc, { money }) => acc + money, 0);
//   const amountCategories = array =>
//     array.reduce((acc, value) => {
//       const category = value.category;
//       const { money } = value;

//       acc[category]
//         ? (acc[category] = acc[category] += money)
//         : (acc[category] = money);

//       return acc;
//     }, {});

//   const getUniqueMonth = array =>
//     array.reduce((acc, { month }) => {
//       if (!acc.includes(month)) {
//         acc.push(month);
//       }
//       return acc;
//     }, []);
//   const getUniqueYear = array =>
//     array.reduce((acc, { year }) => {
//       if (!acc.includes(year)) {
//         acc.push(year);
//       }
//       return acc;
//     }, []);

//   let totalIncomeArr;
//   let totalSpendArr;

//   if (query.month && query.year) {
//     totalIncomeArr = await Transactions.getAllIncomeByDate(
//       id,
//       query.month,
//       query.year,
//     );
//     totalSpendArr = await Transactions.getAllSpendByDate(
//       id,
//       query.month,
//       query.year,
//     );
//   } else {
//     totalIncomeArr = await Transactions.getAllIncome(id);
//     totalSpendArr = await Transactions.getAllSpend(id);
//   }

//   const totalIncome = amountMoney(totalIncomeArr);
//   const totalSpend = amountMoney(totalSpendArr);
//   const categoriesSummary = amountCategories(totalSpendArr);
//   const uniqueMonth = getUniqueMonth(totalSpendArr);
//   const uniqueYear = getUniqueYear(totalSpendArr);

//   return res.json({
//     status: 'Success',
//     code: 200,
//     data: {
//       categoriesSummary,
//       totalIncome,
//       totalSpend,
//       uniqueMonth: uniqueMonth.sort(),
//       uniqueYear: uniqueYear.sort(),
//     },
//   });
// };


// const getStatistics = async ({ user: { id }, query }, res) => {
//     const categoriesSummary = await Transaction.aggregate([
//         { $match: {
//             owner: Types.ObjectId(id),
//           type: true,
//           month: query.month,
//             year:query.year,
//          } },
//         {
//             $group:
//             {
//                 _id: {category:'$category'},
//                 totalSum: { $sum: '$sum' }
//             }
//         },
//     ]);
//   const totalIncome = await Transaction.aggregate([
//         { $match: {
//             owner: Types.ObjectId(id),
//           type: true,
//           month: query.month,
//             year:query.year,
//          } },
//         {
//             $group:
//             {
//                 _id: null,
//                 totalSum: { $sum: '$sum' }
//             }
//         },
//   ]);
//   const totalSpend= await Transaction.aggregate([
//         { $match: {
//             owner: Types.ObjectId(id),
//           type: false,
//           month: query.month,
//             year:query.year,
//          } },
//         {
//             $group:
//             {
//                 _id: null,
//                 totalSum: { $sum: '$sum' }
//             }
//         },
//   ]);
//      return res.json({
//     status: 'Success',
//     code: 200,
//     data: {
//       categoriesSummary,
//       totalIncome,
//       totalSpend
//     },
//   });
// }
// module.exports = getStatistics;
const { Transaction } = require("../../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getStatistics = async ({ user: { id }, query }, res) => {
  console.log(id)
  const result = await Transaction.find({
    // owner: ObjectId(id),
    // owner: JSON.stringify(id),
    // owner:ObjectId("62110c0d4b4dfa3bbc8b2932"),
    type: false,
    month: Number(query.month),
    year: Number(query.year),
  });

  // console.log(result);
  // console.log(id);
  const categoriesSummary = await Transaction.aggregate([
    {
      $match: {
        owner: "62110c0d4b4dfa3bbc8b2932",
        type: true,
        month: Number(query.month),
        year: Number(query.year),
      },
    },
    {
      $group: {
        _id: { category: "$category" },
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: { _id: 0, category: "$_id.category", totalSum: "$totalSum" },
    },
  ]);
  const totalIncome = await Transaction.aggregate([
    {
      $match: {
        // owner: id,
        type: true,
        month: Number(query.month),
        year: Number(query.year),
      },
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: { _id: 0, totalSum: "$totalSum" },
    },
  ]);
  const totalSpend = await Transaction.aggregate([
    {
      $match: {
        // owner: id,
        type: false,
        month: Number(query.month),
        year: Number(query.year),
      },
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: { _id: 0, totalSum: "$totalSum" },
    },
  ]);
  return res.json({
    status: "Success",
    code: 200,
    data: {
      categoriesSummary,
      totalIncome,
      totalSpend,
    },
  });
};
module.exports = getStatistics;
