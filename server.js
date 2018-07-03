const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config({ path: 'variables.env'});
const Job = require('./models/Job');
const User = require('./models/User');

// connects to database
mongoose
 .connect(process.env.MONGO_URI)
 .then(() => console.log(`Monogo Database connected successfully`))
 .catch(err =>  console.error(err))

 // initializes the application
const app = express()

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
