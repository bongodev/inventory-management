import invAxios from '../common/axios';

const getProducts = async () => {
  const productResponse = await invAxios.get('/products');
  return productResponse.data;
};

const createProduct = (product) => invAxios.post('/products', product);

const deleteProduct = (productId) => invAxios.delete(`/products/${productId}`);

export const ProductServices = {
  createProduct,
  getProducts,
  deleteProduct,
};
