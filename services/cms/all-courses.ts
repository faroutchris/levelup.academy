import makeQuery from '../../libs/graphql-request/make-query';

const query = `
  query AllCourses ($page: Int!) {
    course(page: $page) {
      id
      title
      description
      modules{
        id
        title
        description
        lessons {
          id
          title
        }
      }
    }
  }
`;

type Response = {
  course: [
    {
      id: string;
      title: string;
      description: string;
      modules: {
        id: string;
        title: string;
        description: string;
        lessons: {
          id: string;
          title: string;
        }[];
      }[];
    },
  ];
};

type QueryData = {
  page: number;
};

const queryAllCourses = makeQuery<QueryData, Response>(query);

export default queryAllCourses;
