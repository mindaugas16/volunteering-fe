const Activity = require('../../models/activity');
const User = require('../../models/user');
const Event = require('../../models/event');
const { transformActivity, transformDateRange } = require('./merge');

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
    activity: async (args) => {
        try {
            const activity = await Activity.findById(args.activityId);
            return transformActivity(activity);
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
            date: transformDateRange(args.activityInput.date),
            creator: req.userId,
            event: fetchedEvent
        });
        let createdActivity;
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }
            if (!fetchedEvent) {
                throw new Error('Event not found.');
            }
            const result = await activity.save();
            createdActivity = transformActivity(result);

            user.createdActivities.push(createdActivity);
            await user.save();

            fetchedEvent.activities.push(createdActivity);
            await fetchedEvent.save();

            return createdActivity;
        } catch (err) {
            throw err;
        }
    }
};
