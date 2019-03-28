const authResolver = require('./auth');
const eventResolver = require('./event');
const activityResolver = require('./activity');
const participationResolver = require('./participation');
const organizationResolver = require('./organization');

const rootResolvers = {
    ...authResolver,
    ...eventResolver,
    ...activityResolver,
    ...participationResolver,
    ...organizationResolver
};

module.exports = rootResolvers;
