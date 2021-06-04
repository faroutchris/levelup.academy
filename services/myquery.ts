import gql from 'graphql-tag';

const query = gql`
  query {
    lesson {
      id
      status
      title
    }
  }
`;

export default query;
