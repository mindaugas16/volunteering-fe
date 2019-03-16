const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    event: async (args) => {
        try {
            const event = await Event.findById(args.eventId);
            return transformEvent(event);
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                date: dateToString(args.eventInput.date),
                location: args.eventInput.location,
                creator: req.userId
            });
            const result = await event.save();

            user.createdEvents.push(event);
            await user.save();
            return transformEvent(result);
        } catch (err) {
            throw err;
        }
    }
};
