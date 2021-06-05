import Head from 'next/head';
import React from 'react';
import { useQuery } from 'react-query';
import Button from '../components/Button';
import Container from '../components/Container';
import cmsAPI from '../config/cms-api';
import DirectusError from '../constants/directus-error';
import { successful } from '../libs/response-checker/response-checker';
import useAuthStore from '../store/auth';

export const Home = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const query = useQuery(
    'course',
    async () => {
      try {
        const response = await cmsAPI.get('/items/lesson/2?fields=title,module_id.lessons.*');
        if (successful(response)) {
          return response;
        }
      } catch (error) {
        return Promise.reject(new DirectusError(error.response.data.errors[0]));
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      staleTime: 60 * 1000,
    },
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
        <Container>
          <div>
            <Button color="primary" onClick={handleApiCall}>
              Test api call
            </Button>
            <Button color="primary" onClick={handleApiCall}>
              Test api call
            </Button>
          </div>
          <ul>
            <li>Hello</li>
          </ul>
        </Container>
      </main>
    </>
  );
};

export default Home;
