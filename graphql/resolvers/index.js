const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');
const activityResolver = require('./activity');
const participationResolver = require('./participation');

const rootResolvers = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver,
    ...activityResolver,
    ...participationResolver
};

module.exports = rootResolvers;
