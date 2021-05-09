import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Hero from '../components/Hero';
import config from '../config/config';

export const Home = ({ courses }: { courses: Course[] }): JSX.Element => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Hero />
      <button
        onClick={() => {
          window.alert('With typescript and Jest');
        }}
      >
        Test Button
      </button>

      <div className="grid">
        {courses.map((course) => (
          <a key={course.id} href={`/courses/${course.slug}`} className="card">
            <h3>{course.title}</h3>
            <p>Lessons in this module {course.lessons.length}</p>
          </a>
        ))}
      </div>
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
      </a>
    </footer>
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${config.apiHost}/courses`);

  const courses = await response.json();

  return {
    props: {
      courses,
    },
  };
};

export default Home;
