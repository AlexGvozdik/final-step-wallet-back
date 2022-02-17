const Transactions = require("../../repository/transactions");

const getStatistics = async ({ user: { id }, query }, res) => {
  const amountMoney = array => array.reduce((acc, { money }) => acc + money, 0);
  const amountCategories = array =>
    array.reduce((acc, value) => {
      const category = value.category;
      const { money } = value;

      acc[category]
        ? (acc[category] = acc[category] += money)
        : (acc[category] = money);

      return acc;
    }, {});

  const getUniqueMonth = array =>
    array.reduce((acc, { month }) => {
      if (!acc.includes(month)) {
        acc.push(month);
      }
      return acc;
    }, []);
  const getUniqueYear = array =>
    array.reduce((acc, { year }) => {
      if (!acc.includes(year)) {
        acc.push(year);
      }
      return acc;
    }, []);

  let totalIncomeArr;
  let totalSpendArr;

  if (query.month && query.year) {
    totalIncomeArr = await Transactions.getAllIncomeByDate(
      id,
      query.month,
      query.year,
    );
    totalSpendArr = await Transactions.getAllSpendByDate(
      id,
      query.month,
      query.year,
    );
  } else {
    totalIncomeArr = await Transactions.getAllIncome(id);
    totalSpendArr = await Transactions.getAllSpend(id);
  }

  const totalIncome = amountMoney(totalIncomeArr);
  const totalSpend = amountMoney(totalSpendArr);
  const categoriesSummary = amountCategories(totalSpendArr);
  const uniqueMonth = getUniqueMonth(totalSpendArr);
  const uniqueYear = getUniqueYear(totalSpendArr);

  return res.json({
    status: 'Success',
    code: 200,
    data: {
      categoriesSummary,
      totalIncome,
      totalSpend,
      uniqueMonth: uniqueMonth.sort(),
      uniqueYear: uniqueYear.sort(),
    },
  });
};

module.exports = getStatistics;
