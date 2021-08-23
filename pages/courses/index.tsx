import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Card from '../../components/Card';
import PageHeading from '../../components/PageHeading';
import ProductGrid from '../../components/ProductGrid';
import Type from '../../components/Type';
import withAuth from '../../components/WithAuth';
import queryAllCourses from '../../services/cms/all-courses';

const CourseIndex: React.FC = () => {
  const [error, setError] = useState(null);

  const query = useQuery('all-courses', () => queryAllCourses({ page: 1 }), {
    onError: (error) => {
      setError(error);
    },
    staleTime: 60 * 1000,
  });

  if (error) {
    return <div>error</div>;
  }

  if (query.isFetching) {
    return <div>Loading</div>;
  }

  return (
    <>
      <PageHeading>
        <Type as="h2" size="pageheading">
          Courses
        </Type>
      </PageHeading>
      <ProductGrid>
        {query.isSuccess &&
          query.data.data.course.map((course) => {
            return (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <a>
                  <Card as="ul">
                    <li>
                      <h3>{course.title}</h3>
                      {course.modules.map((module) => {
                        return (
                          <div key={module.id}>
                            <h4>{module.title}</h4>
                            <ul>
                              {module.lessons.map((lesson) => {
                                return <p key={lesson.id}>{lesson.title}</p>;
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </li>
                  </Card>
                </a>
              </Link>
            );
          })}
      </ProductGrid>
    </>
  );
};

export default withAuth(CourseIndex);
