const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const jwt = require("jsonwebtoken");
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

// Setup JWT Authentication Middleware
app.use( async ( req, res, next ) => {
    const token = req.headers['authorization'];
    console.log(token, typeof token)
    if (token !== 'null'){
        try{
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        }catch(err){
            console.error(err);
        }
    }
    next();
});

// Initialize Graphiql App at endpoint /graphiql
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// bind the schema and mongoose models
app.use('/graphql', 
bodyParser.json(), 
graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
        Job,
        User,
        currentUser
    }
}))
);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
