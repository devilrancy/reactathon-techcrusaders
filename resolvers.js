const jwt = require("jsonwebtoken")

const createToken = (user, secret, expiresIn) => {
    const {username, email} = user; 
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {

    Query: {
        getAllJobs: async (root, args, { Job }) => {
            const allJobs = await Job.find();
            return allJobs;
        }
    },

    Mutation: {
        addJob: async (root, { name, category, description, skillset, username }, { Job } ) => {
            const newJob = await new Job({
                name,
                category,
                description,
                skillset,
                username
            }).save();
            return newJob;
        },

        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({username});
            if (user) {
                throw new ("User Already Exists!");   
            }
            const newUser = await new User({
                username,
                email,
                password,
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '1hr') }
        }
    }
};