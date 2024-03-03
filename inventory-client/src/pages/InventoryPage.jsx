import React from 'react';

import { Box, Table } from '../ui';

import { useProducts } from '../hooks';

export const InventoryPage = () => {
  const { isLoading, products } = useProducts();

  const getFormattedRows = () => {
    return products.map((product, index) => ({
      id: product._id,
      ID: index + 1,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      createdAt: new Date(product.createdAt),
    }));
  };

  return (
    <Box px={8} py={4}>
      <Table
        autoHeight
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        columns={[
          { field: 'ID' },
          { field: 'name', headerName: 'Product Name', width: 300 },
          { field: 'description', headerName: 'Description', width: 300 },
          {
            align: 'center',
            field: 'createdAt',
            headerAlign: 'center',
            headerName: 'Added On',
            width: 200,
            type: 'dateTime',
          },
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
