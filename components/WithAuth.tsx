import { useRouter } from 'next/router';
import React from 'react';
import STATIC_ROUTES from '../constants/routes';
import useAuthStore from '../store/auth';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { accessToken } = useAuthStore();

    console.log(accessToken);

    if (typeof window !== 'undefined') {
      const Router = useRouter();

      if (!accessToken) {
        Router.replace(STATIC_ROUTES.Home);
        return null;
      }

      return <WrappedComponent {...(props as P)} />;
    }

    return null;
  };
};

export default withAuth;
