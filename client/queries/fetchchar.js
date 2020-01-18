import gql from 'graphql-tag';

export default gql`
  query fetchCharById($id: String){
      character(id: $id){
          id
          firstName
          lastName
          class
          level
          age
          ancestry
          bio
          image
          statline {
              strength
              dexterity
              constitution
              intelligence
              wisdom
              charisma
          }
          user {
              id
              username
          }
      },
      currentUser {
        id
      }
  }
`;
