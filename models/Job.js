const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skillset: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    applicants: {
        type: Number,
        default: 0
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('Job', JobSchema);