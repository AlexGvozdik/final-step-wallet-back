/*
* Decided not to have categories for income transactions.
* Frontend will hardcode smth like "income" in the category
* when sending json to backend.
*/

// const { Category } = require('../../models/category');

// const getIncomeCategories = async (req, res) => {
//   const filter = { type: 'income' };
//   const categories = await Category.find(filter);
//   res.json({
//     status: 'success',
//     code: 200,
//     categories,
//     quantity: categories.length
//   });
// };

// module.exports = getIncomeCategories;