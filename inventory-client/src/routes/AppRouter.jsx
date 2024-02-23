import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout, LoginPage, ContactPage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export const AppRouterProvider = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};
