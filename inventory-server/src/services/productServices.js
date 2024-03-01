const { Product } = require('../models');

const getProducts = async () => {
  const products = await Product.find();
  return products; 
};

const createProduct = (payload) => {
  const product = new Product(payload);
  return product.save();
};

const ProductServices = { createProduct, getProducts };

module.exports = ProductServices;
