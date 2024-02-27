const express = require('express');
const ProductServices = require('../services/productServices');

const productRouter = express.Router();

productRouter.get('/products', async (req, res) => {
  const products = await ProductServices.getProducts();
  res.json(products);
});

module.exports = productRouter;
