import Head from 'next/head';
import Image from 'next/image';
import config from '../../../config/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StatusCodes } from '../../../constants/statuscodes';

export const LessonPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Lesson>(null);

  useEffect(() => {
    if (id) {
      const token = window.localStorage.getItem('AuthToken');

      const func = async () => {
        try {
          const response = await fetch(`${config.apiHost}/lessons/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.statusCode === StatusCodes.UNAUTHORIZED) {
            router.push('/login');
          }
          if (data.statusCode === StatusCodes.FORBIDDEN) {
            router.push('/login');
          }
          setData(data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };

      func();
    }
    return () => {
      //
    };
  }, [id]);

  if (data === null) {
    return null;
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Hello</h1>

        {data.scenarios.map((scenario) => {
          if (scenario.__component === 'lesson-components.article') {
            return <p>{scenario.title}</p>;
          }
          if (scenario.__component === 'lesson-components.question-scenario') {
            return <p>{scenario.question}</p>;
          }
          if (scenario.__component === 'lesson-components.video-lesson') {
            return <p>{scenario.title}</p>;
          }
          return null;
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

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default LessonPage;
