const Event = require('../../models/event');
const User = require('../../models/user');
const Organization = require('../../models/organization');
const { transformEvent, transformDateRange } = require('./merge');

module.exports = {
    events: async (args) => {
        try {
            const events = await Event.find().sort(args.orderBy);
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
    createEvent: async ({ eventInput }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            const organization = await Organization.findById(eventInput.organizationId);

            if (!organization) {
                throw new Error('Organization not found.');
            }

            const event = new Event({
                title: eventInput.title,
                description: eventInput.description,
                date: transformDateRange(eventInput.date),
                location: eventInput.location,
                creator: req.userId,
                organization: organization._id,
                imagePath: eventInput.imagePath
            });
            const result = await event.save();

            user.createdEvents.push(event);
            await user.save();

            organization.events.push(event);
            await organization.save();

            return transformEvent(result);
        } catch (err) {
            throw err;
        }
    },
    updateEvent: async ({ id, eventInput }, req) => {
        if (!req.isAuth) {
            const error = new Error('Unauthenticated');
            error.code = 401;
            throw error;
        }

        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            const event = await Event.findById(id);

            if (!event) {
                throw new Error('Event not found');
            }

            if (!event.creator._id.equals(user._id)) {
                throw new Error('You can\'t update event details');
            }

            event.name = eventInput.name;
            event.description = eventInput.description;
            event.date = eventInput.date;
            event.location = { ...eventInput.location };

            const updatedEvent = await event.save();

            return transformEvent(updatedEvent);
        } catch (err) {
            throw err;
        }
    }
};
