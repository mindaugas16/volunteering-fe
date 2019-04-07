const User = require('../../models/user');
const Event = require('../../models/event');
const Activity = require('../../models/activity');
const Organization = require('../../models/organization');
const { dateToString } = require('../../helpers/date');

const DataLoader = require('dataloader');

const eventLoader = new DataLoader(eventIds => {
    return events(eventIds);
});

const activityLoader = new DataLoader(activityIds => {
    return activities(activityIds);
});

const userLoader = new DataLoader(userIds => {
    return users(userIds);
});

const organizationLoader = new DataLoader(ids => {
    return organizations(ids);
});

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event.date),
        creator: user.bind(this, event.creator),
        activities: activities.bind(this, event.activities),
        organization: organization.bind(this, event.organization)
    }
};

const transformOrganization = organization => {
    return {
        ...organization._doc,
        _id: organization._id,
        creator: user.bind(this, organization.creator),
        members: users.bind(this, organization.members),
        events: () => eventLoader.loadMany(organization._doc.events),
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

const transformDateRange = date => {
    return {
        start: dateToString(date.start),
        end: date.end ? dateToString(date.end) : null
    }
};

const transformActivity = activity => {
    return {
        ...activity._doc,
        _id: activity.id,
        date: transformDateRange(activity._doc.date),
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
        const activity = await activityLoader.load(activityId.toString());
        if (!activity) {
            throw new Error('Activity not found');
        }
        return activity;
    } catch (err) {
        throw err;
    }
};

const users = async userIds => {
    try {
        return await User.find({ _id: { $in: userIds } });
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
            createdActivities: () => activityLoader.loadMany(user._doc.createdActivities)
        }
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        return await eventLoader.load(eventId.toString());
    } catch (err) {
        throw err;
    }
};

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

const organization = async organizationId => {
    try {
        return await organizationLoader.load(organizationId.toString());
    } catch (err) {
        throw err;
    }
};

const organizations = async organizationIds => {
    try {
        const organizations = await Organization.find({ _id: { $in: organizationIds } });
        return organizations.map(organization => {
            return transformOrganization(organization);
        });
    } catch (err) {
        throw err;
    }
};


exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformActivity = transformActivity;
exports.transformParticipation = transformParticipation;
exports.transformDateRange = transformDateRange;
exports.transformOrganization = transformOrganization;
