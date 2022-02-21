const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  categoryName: {
    type: String,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
  },
}, { versionKey: false, timestamps: true });

const Category = model('category', categorySchema);

module.exports = {
  Category
};