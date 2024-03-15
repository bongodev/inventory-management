const { Product } = require('../models');

const getProducts = async () => {
  const products = await Product.find();
  return products;
};

const createProduct = (payload) => {
  const product = new Product(payload);
  return product.save();
};

const deleteProduct = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.log(error);
  }
};

const ProductServices = { createProduct, getProducts, deleteProduct };

module.exports = ProductServices;
