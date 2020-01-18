import gql from 'graphql-tag';

export default  gql`
  {
    characters {
      id
      firstName
      lastName
      class
      level
      image
    },
      currentUser {
        id
      }
  }
`;
