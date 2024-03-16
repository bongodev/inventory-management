import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProductForm } from '../components';

import {
  Layout,
  LoginPage,
  ContactPage,
  ProductsPage,
  TestPage,
  InventoryPage,
} from '../pages';

import SecureRoute from './SecureRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'product-form',
        element: (
          <SecureRoute>
            <ProductForm />
          </SecureRoute>
        ),
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'inventory',
        element: (
          <SecureRoute>
            <InventoryPage />
          </SecureRoute>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'test',
    element: <TestPage />,
  },
]);

export const AppRouterProvider = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};
