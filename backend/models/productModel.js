const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: 'sku',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    qty: {
      type: String,
      required: [true, 'Please add quantity'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please add a price'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', ProductSchema);

module.exports = Product;
