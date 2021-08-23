import makeQuery from '../../libs/graphql-request/make-query';

const query = `
  query LessonById($id: ID!) {
    lesson_by_id(id: $id) {
      id
      title
      scenario {
        id
        collection
        item {
          ... on lesson_quiz {
            id
            question
            answers {
              id
              is_correct
              answer
            }
          }
          ... on lesson_video {
            id
            title
            asset
          }
        }
      }
    }
  }
`;

type Response = {
  lesson_by_id: {
    id: string;
    title: string;
    scenario: any[];
  };
};

type QueryData = {
  id: string;
};

const queryLessonById = makeQuery<QueryData, Response>(query);

export default queryLessonById;
