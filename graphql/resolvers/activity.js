const Activity = require('../../models/activity');
const User = require('../../models/user');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { transformActivity } = require('./merge');

module.exports = {
    activities: async () => {
        try {
            const activities = await Activity.find();
            return activities.map(activity => {
                return transformActivity(activity);
            });
        } catch (err) {
            throw err;
        }
    },
    createActivity: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedEvent = await Event.findById(args.activityInput.eventId);

        const activity = new Activity({
            name: args.activityInput.name,
            description: args.activityInput.description,
            date: dateToString(args.activityInput.date),
            creator: req.userId,
            location: args.activityInput.location,
            event: fetchedEvent
        });
        let createdActivity;
        try {
            const result = await activity.save();
            createdActivity = transformActivity(result);
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.createdActivities.push(createdActivity);
            await user.save();

            if (!fetchedEvent) {
                throw new Error('Event not found.');
            }
            fetchedEvent.activities.push(createdActivity);
            await fetchedEvent.save();

            return createdActivity;
        } catch (err) {
            throw err;
        }
    }
};
