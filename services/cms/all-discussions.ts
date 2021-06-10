import makeQuery from '../../libs/graphql-request/make-query';

const query = `
  query AllDiscussions ($page: Int!, $withReplies: Boolean!) {
    board_topic(page: $page) {
      id
      title
      text
      date_created 
      replies @include(if: $withReplies) {
        id
        text
        user_created {
          id
          first_name
        }
      }
      user_created{
        id
        first_name
      }
    }
  }
`;

type Response = {
  board_topic: [
    {
      id: number;
      title: string;
      text: string;
      date_created: string;
      replies?: {
        id: number;
        text: string;
        user_created: {
          id: string;
          first_name: string;
        };
      };
      user_created: {
        id: string;
        first_name: string;
      };
    },
  ];
};

type QueryData = {
  page: number;
  withReplies: boolean;
};

const queryAllDiscussions = makeQuery<QueryData, Response>(query);

export default queryAllDiscussions;
