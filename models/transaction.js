const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

const transactionSchema = Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default:'',
    },
    sum: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamp: true }
);

const joiSchema = Joi.object({
  day: Joi.number().integer().positive().max(31).required(),
  month: Joi.number().integer().positive().max(12).required(),
  year: Joi.number().integer().positive().min(2021).max(2023).required(),
  type: Joi.boolean().required(),
  category: Joi.string().required().optional(),
  comment: Joi.string().optional().allow(''),
  balance: Joi.number(),
  sum: Joi.number().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiSchema };