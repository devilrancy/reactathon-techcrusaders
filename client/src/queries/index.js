import { gql } from 'apollo-boost';

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