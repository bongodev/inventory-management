import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout, LoginPage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export const AppRouterProvider = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};
