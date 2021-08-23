import React from 'react';
import Image from 'next/image';
import AppTemplate from './AppTemplate';
import ContentMain from './ContentMain';
import Sidebar from './Sidebar';
import Nav from './Nav';
import SidebarBrand from './SidebarBrand';
import Link from 'next/link';
import STATIC_ROUTES from '../constants/routes';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppTemplate>
      <Nav />
      <Sidebar>
        <SidebarBrand>
          <Image src="/logo.svg" alt="Levelup Logo" height={'45'} width={'32'} />
          <Link href={STATIC_ROUTES.Home}>
            <a>Levelup.academy</a>
          </Link>
        </SidebarBrand>
      </Sidebar>
      <ContentMain>{children}</ContentMain>
    </AppTemplate>
  );
};

export default Layout;
