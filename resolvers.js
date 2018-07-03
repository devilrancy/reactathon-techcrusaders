const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createToken = (user, secret, expiresIn) => {
    const {username, email} = user; 
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {

    Query: {
        getAllJobs: async (root, args, { Job }) => {
            const allJobs = await Job.find();
            return allJobs;
        },

        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ username: currentUser.username })
              .populate({
                path: 'appliedJobs',
                model: 'Job'
              });
            return user;
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

        signinUser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({username});
            if (!user) {
                throw new ("User Not Found!");   
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword){
                throw new ("Please check your credentials!")
            }

            return { token: createToken(user, process.env.SECRET, '1hr') }
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