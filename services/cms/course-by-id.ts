import makeQuery from '../../libs/graphql-request/make-query';

const query = `
  query CourseById ($id: ID!) {
    course_by_id(id: $id) {
      id
      title
      description
      modules {
        id
        title
        sort
        status
        description
        lessons {
          title
          id
        }
      }
    }
  }
`;

type Response = {
  course_by_id: {
    id: string;
    title: string;
    description: string;
    modules: {
      id: string;
      title: string;
      sort: number;
      status: 'published' | 'draft' | 'unpublished';
      description: string;
      lessons: { title: string; id: string }[];
    }[];
  };
};

type QueryData = {
  id: string;
};

const queryCourseById = makeQuery<QueryData, Response>(query);

export default queryCourseById;
