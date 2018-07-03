const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
require('dotenv').config({ path: 'variables.env'});
const Job = require('./models/Job');
const User = require('./models/User');

// Bring in graphql
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// create graphql schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// connects to database
mongoose
 .connect(process.env.MONGO_URI)
 .then(() => console.log(`Monogo Database connected successfully`))
 .catch(err =>  console.error(err))

 // initializes the application
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));

// Initialize Graphiql App at endpoint /graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// bind the schema and mongoose models
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
        Job,
        User
    }
})
);


const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
