import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { QueryProvider } from '@/providers';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthFromCookies = (): boolean => {
      const user = localStorage.getItem('inv-user');
      return !!user;
    };

    if (!checkAuthFromCookies()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <QueryProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset>
          <SidebarTrigger />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
};

export default Layout;
