const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');

const rootResolvers = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
};

module.exports = rootResolvers;
