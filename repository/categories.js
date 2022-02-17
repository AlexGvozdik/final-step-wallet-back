const { Category } = require("../helpers/constants");

const getCategories = () => {
    const results = [...Category.spend, ...Category.income];
     return results;
}
 
module.exports = { getCategories};