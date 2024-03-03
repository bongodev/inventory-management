import React from 'react';

import { Box, Table } from '../ui';

import { useProducts } from '../hooks';

export const InventoryPage = () => {
  const { products } = useProducts();

  const getFormattedRows = () => {
    return products.map((product, index) => ({
      id: product._id,
      ID: index + 1,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      createdAt: product.createdAt,
    }));
  };

  return (
    <Box px={8} py={4}>
      <Table
        autoHeight
        columns={[
          { field: 'ID' },
          { field: 'name', headerName: 'Product Name', width: 300 },
          { field: 'description', headerName: 'Description', width: 300 },
          { field: 'createdAt', headerName: 'Added on' },
          {
            align: 'right',
            field: 'price',
            headerName: 'Price (TK)',
            headerAlign: 'right',
            type: 'number',
            width: 180,
          },
          {
            align: 'center',
            field: 'quantity',
            headerName: 'Quantity',
            headerAlign: 'center',
            type: 'number',
          },
        ]}
        rows={getFormattedRows()}
        slots={{ noRowsOverlay: () => <h1>No Data found!!</h1> }}
        sx={{ '--DataGrid-overlayHeight': '300px' }}
      />
    </Box>
  );
};
