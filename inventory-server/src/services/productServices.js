const { Product } = require('../models');

const getProducts = () => [
  {
    id: '1',
    name: 'Computer',
    price: 70000,
    quantity: 20,
  },
  {
    id: '2',
    name: 'Keyboard',
    price: 5000,
    quantity: 40,
  },
];

const createProduct = (payload) => {
  const product = new Product(payload);
  return product.save();
};

const ProductServices = { createProduct, getProducts };

module.exports = ProductServices;
