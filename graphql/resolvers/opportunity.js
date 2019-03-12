const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const { transformOpportunity } = require('./merge');

module.exports = {
    opportunities: async () => {
        try {
            const opportunities = await Opportunity.find();
            return opportunities.map(opportunity => {
                return transformOpportunity(opportunity);
            });
        } catch (err) {
            throw err;
        }
    },
    createOpportunity: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });

        const opportunity = new Opportunity({
            name: args.opportunityInput.name,
            description: args.opportunityInput.description,
            date: dateToString(args.opportunityInput.date),
            creator: req.userId,
            location: args.opportunityInput.location,
            event: fetchedEvent
        });
        let createdOpportunity;
        try {
            const result = await opportunity.save();
            createdOpportunity = transformOpportunity(result);
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.createdOpportunities.push(createdOpportunity);
            await user.save();

            const event = await Event.findById(req.eventId);
            if (!event) {
                throw new Error('Event not found.');
            }
            event.opportunities.push(createdOpportunity);
            await event.save();

            return createdOpportunity;
        } catch (err) {
            throw err;
        }
    }
};
