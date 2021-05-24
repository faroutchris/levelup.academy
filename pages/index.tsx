import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Hero from '../components/Hero';
import config from '../config/config';

export const Home = ({ courses }: { courses: Course[] }): JSX.Element => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Hero />

      <div className="grid">
        {courses.map((course) => (
          <a key={course.id} href={`/courses/${course.slug}`} className="card">
            <h3>{course.title}</h3>
            <p>Lessons in this module {course.lessons.length}</p>
          </a>
        ))}
      </div>
    </main>
  </>
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
