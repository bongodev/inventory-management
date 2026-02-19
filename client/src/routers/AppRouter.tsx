import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { Layout, Login } from '@/pages';
import { RightSideDrawer } from '@/pages/instances';
import Dashboard from '@/pages/instances/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RightSideDrawer/>,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'instances',
        element: <RightSideDrawer/>,
      },
      {
        path: 'products',
        element: <div>products page</div>,
      },
      {
        path: 'orders',
        element: <div>orders page</div>,
      },
      {
        path: 'reports',
        element: <div>reports page</div>,
        
      },
      {
        path: 'users',
        element: <div>users page</div>,
      },
      {
        path: 'settings',
        element: <div>settings page</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
