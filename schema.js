exports.typeDefs = `

type Job {
    _id: ID
    name: String!
    category: String!
    description: String!
    skillset: String!
    createdDate: String
    applicants: Int
    username: String   
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinedDate: String
    appliedJobs: [Job]
}

type Query {
    getAllJobs: [Job]
}

type Token {
    token: String!
}

type Mutation {
    addJob(name: String!, category: String!, description: String!, skillset: String!, 
        username: String): Job

    signupUser(username: String!, email: String!, password: String!): Token
}

`;