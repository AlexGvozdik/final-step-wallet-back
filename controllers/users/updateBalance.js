/*
 * As all the calculations and currentBalance update are done in the "addTransaction" controller,
 * there is no need in the separate "updateBalance" controller and the endpoint "PATCH/users/balance".
 */

// const { NotFound } = require('http-errors');
// const { User } = require('../../models/user');

// const updateBalance = async (req, res) => {
//   const { _id } = req.user;
//   const { currentBalance } = req.body;
//   const result = await User.findByIdAndUpdate(_id, { currentBalance }, { new: true });
//   if (!result) {
//     throw new NotFound(`User with id=${_id} not found`);
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     user: {
//       email: result.email,
//       name: result.name,
//       currentBalance: result.currentBalance,
//     }
//   });
// };

// module.exports = updateBalance;