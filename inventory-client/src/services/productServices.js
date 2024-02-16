const getProducts = () => {
  return [
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
};

export const ProductServices = {
  getProducts,
};
