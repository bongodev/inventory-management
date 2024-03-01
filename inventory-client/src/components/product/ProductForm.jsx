import React from 'react';

import { Box, Button, Stack, TextField, Typography } from '../../ui';
import invAxios from '../../common/axios';

export const ProductForm = () => {
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [`${e.target.name}`]: e.target.value });
  };

  const handleSubmit = () => {
    invAxios.post('/products', product);
  };

  return (
    <Box justifyContent="center">
      <Stack spacing={2} py={4}>
        <Typography variant="subtitle1">Add Product</Typography>
        <TextField
          name="name"
          label="Name"
          variant="standard"
          onChange={handleChange}
          value={product.name}
        />
        <TextField
          name="description"
          label="Description"
          variant="standard"
          onChange={handleChange}
          value={product.description}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          variant="standard"
          onChange={handleChange}
          value={product.price}
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          variant="standard"
          onChange={handleChange}
          value={product.quantity}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Add
        </Button>
      </Stack>
    </Box>
  );
};
