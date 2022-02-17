const { Transaction } = require("../models");

const getAllIncomeByDate = async (userId, month, year) => {
    const result = await Transaction.find({ owner: userId, type: '+', month, year })
    return result;
};

const getAllSpendByDate = async (userId, month, year) => {
    const result = await Transaction.find({ owner: userId, type: '-', month, year })
    return result;
};

const getAllIncome = async (userId) => {
    const result = await Transaction.find({ owner: userId, type: '+' })
    return result;
};

const getAllSpend = async (userId) => {
    const result = await Transaction.find({ owner: userId, type: '-' })
    return result;
};

module.exports = {
    getAllIncome,
    getAllIncomeByDate,
    getAllSpend,
    getAllSpendByDate,
};