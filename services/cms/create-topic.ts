import makeQuery from '../../libs/graphql-request/make-query';

const mutation = `
  mutation CreateTopic ($title: String!, $text: String!) {
    create_board_topic_item(data: {
      title: $title, text: $text
    }) {
      id
    }
  }
`;

export type MutationDataResponse = {
  create_board_topic_item: { id: number };
};

export type MutationDataRequest = {
  title: string;
  text: string;
};

const mutationCreateTopic = makeQuery<MutationDataRequest, MutationDataResponse>(mutation);

export default mutationCreateTopic;
