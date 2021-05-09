import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import config from '../../config/config';

export const CoursePage = ({ course }: { course: Course }): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{course.title}</h1>

        <img
          src={`${config.apiHost}${course.heroImage[0].formats.medium.url}`}
        />

        {course.lessons.map((lesson) => {
          return (
            <div key={lesson.id}>
              <p>
                <Link href={`/courses/${course.slug}/${lesson.id}`}>
                  {lesson.title}
                </Link>
              </p>
              <p>
                Last updated: {new Date(lesson.updated_at).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            height={'32'}
            width={'64'}
          />
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const course = await fetch(
    `${config.apiHost}/courses/${context.params.slug}`
  ).then((res) => res.json());

  return {
    props: {
      course,
    },
  };
};

export default CoursePage;
