import Link from 'next/link';
import React from 'react';
import STATIC_ROUTES from '../constants/routes';

const Header: React.FC = () => {
  return (
    <div className="relative bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start flex-1 lg:w-0">
            <Link href="/">
              <a className="whitespace-nowrap text-xl font-medium text-cardinal-500 hover:text-cardinal-600">
                levelup.academy
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1 lg:w-0">
            <Link href={STATIC_ROUTES.SignIn}>
              <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </a>
            </Link>
            <Link href={STATIC_ROUTES.SignUp}>
              <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border-none rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-cardinal-500 to-cardinal-600">
                Sign up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
