import Head from 'next/head';
import React from 'react';
import Hero from '../components/Hero';

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Hero />

      <div className="grid">App</div>
    </main>
  </>
);

export default Home;
