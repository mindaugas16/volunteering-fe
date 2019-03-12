const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');
const opportunityResolver = require('./opportunity');

const rootResolvers = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver,
    ...opportunityResolver
};

module.exports = rootResolvers;
