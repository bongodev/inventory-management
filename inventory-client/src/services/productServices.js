import invAxios from '../common/axios';

const getProducts = async () => {
  const productResponse = await invAxios.get('/products');
  return productResponse.data;
};

export const ProductServices = {
  getProducts,
};
