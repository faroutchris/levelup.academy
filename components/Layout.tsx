import React from 'react';
import Header from './Header';
import Image from 'next/image';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      {children}
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
