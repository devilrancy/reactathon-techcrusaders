exports.typeDefs = `

type Job {
    name: String!
    category: String!
    description: String!
    skillset: String!
    createdDate: String
    applicants: Int
    username: String   
}

type User {
    username: String! @unique
    password: String!
    email: String!
    joinedDate: String
    appliedJobs: [Job]
}

`;