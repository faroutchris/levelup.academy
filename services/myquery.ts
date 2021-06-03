import gql from 'graphql-tag';

const query = gql`
  query {
    module {
      id
      status
      title
      description
      lessons {
        id
        status
        title
        scenario {
          id
          collection
        }
      }
    }
  }
`;

export default query;
