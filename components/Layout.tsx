import React from 'react';
import Header from './Header';
import PatternDots from './svg/PatternDots';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
