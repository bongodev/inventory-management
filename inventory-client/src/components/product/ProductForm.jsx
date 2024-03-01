import React from 'react';

import { Box, Button, Stack, TextField, Typography } from '../../ui';
import { useNavigate } from 'react-router-dom';

import { ProductServices } from '../../services';

export const ProductForm = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (e) =>
    setProduct({ ...product, [`${e.target.name}`]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await ProductServices.createProduct(product);
      navigate('/products');
    } catch (error) {
      alert('Failed to create product!!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box justifyContent="center">
        <Stack spacing={2} py={4}>
          <Typography variant="subtitle1">Add Product</Typography>
          <TextField
            required
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
            required
            name="price"
            label="Price"
            type="number"
            variant="standard"
            onChange={handleChange}
            value={product.price}
          />
          <TextField
            required
            name="quantity"
            label="Quantity"
            type="number"
            variant="standard"
            onChange={handleChange}
            value={product.quantity}
          />
          <Button disabled={isSubmitting} variant="outlined" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
