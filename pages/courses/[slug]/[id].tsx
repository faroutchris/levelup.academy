import Head from 'next/head';
import Image from 'next/image';
import config from '../../../config/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StatusCodes } from '../../../constants/statuscodes';
import STATIC_ROUTES from '../../../constants/routes';

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
            router.push(STATIC_ROUTES.SignIn);
          } else if (data.statusCode === StatusCodes.FORBIDDEN) {
            router.push(STATIC_ROUTES.SignIn); // Not authorized user
          } else {
            setData(data);
          }
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
        <h1 className="title">{data.course.title}</h1>

        {data.scenarios.map((scenario) => {
          if (scenario.__component === 'lesson-components.article') {
            return (
              <p key={scenario.__component + '_' + scenario.id}>
                {scenario.title}
              </p>
            );
          }
          if (scenario.__component === 'lesson-components.question-scenario') {
            return (
              <p key={scenario.__component + '_' + scenario.id}>
                {scenario.question}
              </p>
            );
          }
          if (scenario.__component === 'lesson-components.video-lesson') {
            return (
              <p key={scenario.__component + '_' + scenario.id}>
                {scenario.title}
              </p>
            );
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
    </div>
  );
};

export default LessonPage;
