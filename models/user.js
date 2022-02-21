const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegex,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 1,
    maxlength: 12,
  },
  currentBalance: {
    type: String,
    default: '0'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
  name: Joi.string().min(1).max(12),
  currentBalance: Joi.number()
});

const balanceSchema = Joi.object({
  currentBalance: Joi.number().required()
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema,
  balanceSchema
};