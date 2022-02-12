const { InternalServerError } = require('http-errors')
const { User } = require('../../models')

const getBalance = async (req, res, next) => {
  const userData = await User.findById(req.user._id)

  if (!userData) throw new InternalServerError('Server error')

  res.status(200).json({
    status: 'Balance retrieved',
    code: 200,
    data: {
      user: {
        balance: userData.balance
      }
    }
  })
}

module.exports = getBalance