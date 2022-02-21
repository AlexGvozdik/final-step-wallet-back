const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema({
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['income', 'expense'],
  },
  category: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
  },
  date: {
    type: Date,
    required: [true, 'Transaction date is required'],
  },
  comment: {
    type: String,
  },
  balanceState: {
    type: Number,
    required: [true, 'Balance state after this transaction is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().allow(''),
  amount: Joi.number().required(),
  date: Joi.string().isoDate().required(),
  comment: Joi.string().allow(''),
  balanceState: Joi.number(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  joiSchema
};