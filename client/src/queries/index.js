import { gql } from 'apollo-boost';


// Job Queries
export const GET_ALL_JOBS = gql`
query{
    getAllJobs{
        name
        category
        description
        skillset
        createdDate
        applicants
        username
    }
}
`;

// Job Mutatuions


// User Queries
export const GET_CURRENT_USER = gql`
query{
    getCurrentUser{
        username
        joinedDate
        email
    }
}
`;

// User Mutations

export const SIGNUP_USER = gql`
mutation($username: String!, $email: String!, $password: String! ) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
mutation ($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }  
`;