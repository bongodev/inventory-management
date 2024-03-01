import invAxios from '../common/axios';

const getProducts = async () => {
  const productResponse = await invAxios.get('/products');
  return productResponse.data;
};

const createProduct = async (product) => invAxios.post('/products', product);

export const ProductServices = {
  createProduct,
  getProducts,
};
