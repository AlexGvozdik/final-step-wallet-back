const { Category } = require('../../models/category');

const getExpenseCategories = async (req, res) => {
  const filter = { type: 'expense' };
  const categories = await Category.find(filter);
  res.json({
    status: 'success',
    code: 200,
    categories,
    quantity: categories.length
  });
};

module.exports = getExpenseCategories;