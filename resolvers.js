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
        }
    }
};