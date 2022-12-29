import { gql } from '@apollo/client';

// we import the gql tagged template literal functionality to create a GraphQL 
// mutation called login. This will accept two variables, $email and $password, 
// whose values we'll set up to be passed in as arguments when we integrate this
//  with the login form page.


// In return, we expect the logged-in user's data and the token. With this token, 
// we'll be able to perform other actions unique to the logged-in user.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
