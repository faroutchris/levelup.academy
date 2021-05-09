import Link from 'next/link';
import React from 'react';
import STATIC_ROUTES from '../constants/routes';
import PatternTriangle from './svg/PatternTriangle';

const Hero: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto h-80 bg-gradient-to-br  from-burn-400 to-sienna-500 rounded-xl my-16 relative flex flex-col">
      <h2 className="text-4xl font-bold text-white text-center align-middle justify-items-center">
        Membership content and e-learning
        <br />
        fit for your audience
      </h2>
      <div className="flex align-middle justify-items-center">
        <Link href={STATIC_ROUTES.SignUp}>
          <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border-none rounded-md shadow-xl text-base font-medium text-white bg-sienna-700">
            Sign up
          </a>
        </Link>
        <Link href={STATIC_ROUTES.Home}>
          <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border-2 border-white rounded-md shadow-xl text-base font-medium text-white bg-transparent">
            Learn more
          </a>
        </Link>
      </div>
      <PatternTriangle className="absolute right-4 top-4" />
      <PatternTriangle className="absolute left-4 bottom-4 transform rotate-180" />
    </section>
  );
};

export default Hero;
