const Event = require('../../models/event');
const User = require('../../models/user');
const Activity = require('../../models/activity');
const { dateToString } = require('../../helpers/date');

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
        activities: activities.bind(this, event.activities)
    }
};

const transformParticipation = participation => {
    return {
        ...participation._doc,
        _id: participation.id,
        volunteer: user.bind(this, participation._doc.volunteer),
        activity: singleActivity.bind(this, participation._doc.activity)
    }
};

const transformActivity = activity => {
    return {
        ...activity._doc,
        _id: activity.id,
        date: dateToString(activity._doc.date),
        creator: user.bind(this, activity._doc.creator),
        event: singleEvent.bind(this, activity._doc.event),
        createdAt: dateToString(activity._doc.createdAt),
        updatedAt: dateToString(activity._doc.updatedAt)
    }
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
};

const activities = async activityIds => {
    try {
        const activities = await Activity.find({ _id: { $in: activityIds } });
        return activities.map(activity => {
            return transformActivity(activity);
        });
    } catch (err) {
        throw err;
    }
};

const singleActivity = async activityId => {
    try {
        const activity = await Activity.findById(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }
        return transformActivity(activity);
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents),
            createdActivities: activities.bind(this, user._doc.createdActivities)
        }
    } catch (err) {
        throw err;
    }
};

const events = async eventIds => {
    try {
        const events = await User.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformActivity = transformActivity;
exports.transformParticipation = transformParticipation;
