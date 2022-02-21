const { Transaction } = require("../models");

const getAllIncomeByDate = async (userId, month, year) => {
    try {
        const result = await Transaction.find({ owner: userId, type: true, month, year })
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllSpendByDate = async (userId, month, year) => {
    const result = await Transaction.find({ owner: userId, type: false, month, year })
    return result;
};

const getAllIncome = async (userId) => {
    const result = await Transaction.find({ owner: userId, type: true })
    return result;
};

const getAllSpend = async (userId) => {
    const result = await Transaction.find({ owner: userId, type: false })
    return result;
};

module.exports = {
    getAllIncome,
    getAllIncomeByDate,
    getAllSpend,
    getAllSpendByDate,
};