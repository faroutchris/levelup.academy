import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import cmsAPI from '../config/cms-api';
import DirectusError from '../constants/directus-error';
import STATIC_ROUTES from '../constants/routes';
import { successfulResponse } from '../libs/response-checker/response-checker';
import useAuthStore from '../store/auth';

export const Home = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const query = useQuery(
    'course',
    async () => {
      try {
        const response = await cmsAPI.get('/items/lesson/2?fields=title,module_id.lessons.*');
        if (successfulResponse(response)) {
          return response;
        }
      } catch (error) {
        return Promise.reject(new DirectusError(error.response.data.errors[0]));
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleApiCall = () => {
    accessToken;
    query.refetch();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid">App</div>
        <div>
          <Link href={STATIC_ROUTES.SignIn}>
            <a>Sign in</a>
          </Link>
        </div>
        <div>
          <Link href={STATIC_ROUTES.SignUp}>
            <a>Sign up</a>
          </Link>
        </div>
        <div>
          <button className="btn btn-primary btn-sm" onClick={handleApiCall}>
            Test api call
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
