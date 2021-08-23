import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import PageHeading from '../../../components/PageHeading';
import Type from '../../../components/Type';
import withAuth from '../../../components/WithAuth';
import queryLessonById from '../../../services/cms/lesson-by-id';

export const LessonPage = ({ lessonId }: { lessonId: string }): JSX.Element => {
  const query = useQuery(`lesson-by-id-${lessonId}`, () => queryLessonById({ id: lessonId }), {
    staleTime: 1000 * 60,
  });

  if (query.isError) {
    return <div>error</div>;
  }

  if (query.isFetching) {
    return <div>Loading</div>;
  }

  if (query.isSuccess) {
    const lesson = query.data.data.lesson_by_id;
    return (
      <>
        <Head>
          <title>{lesson.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <PageHeading>
          <Type as="h1" size="pageheading">
            {lesson.title}
          </Type>
        </PageHeading>

        <ul>
          {lesson.scenario.map((scenario) => {
            return <li key={scenario.id}>{scenario.collection}</li>;
          })}
        </ul>
      </>
    );
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: { lessonId: string } }> => {
  const { query } = context;
  return {
    props: { lessonId: query.lesson_id as string }, // will be passed to the page component as props
  };
};

export default withAuth(LessonPage);
