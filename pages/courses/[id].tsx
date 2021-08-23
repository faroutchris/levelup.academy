import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import PageHeading from '../../components/PageHeading';
import Type from '../../components/Type';
import withAuth from '../../components/WithAuth';
import queryCourseById from '../../services/cms/course-by-id';

export const CoursePage = ({ id }: { id: string }): JSX.Element => {
  const query = useQuery(`course-by-id-${id}`, () => queryCourseById({ id }), {
    staleTime: 1000 * 60,
  });

  if (query.isError) {
    return <div>error</div>;
  }

  if (query.isFetching) {
    return <div>Loading</div>;
  }

  if (query.isSuccess && query.data) {
    const course = query.data.data.course_by_id;
    return (
      <>
        <Head>
          <title>Course</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <PageHeading>
          <Type as="h1" size="pageheading">
            {course.title}
          </Type>
        </PageHeading>
        <Type as="p" size="base">
          {course.description}
        </Type>

        <ul>
          {course.modules.map((module) => {
            return (
              <li key={module.id}>
                <Type as="h3" size="larger">
                  {module.title}
                </Type>
                <Type as="p" size="base">
                  {module.description}
                </Type>
                <ul>
                  {module.lessons.map((lesson) => {
                    return (
                      <Link href={`/courses/${course.id}/${lesson.id}`} key={lesson.id}>
                        <a>
                          <li>{lesson.title}</li>
                        </a>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: { id: string } }> => {
  const { query } = context;
  return {
    props: { id: query.id as string }, // will be passed to the page component as props
  };
};

export default withAuth(CoursePage);
