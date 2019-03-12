const Event = require('../../models/event');
const User = require('../../models/user');
const Opportunity = require('../../models/opportunity');
const { dateToString } = require('../../helpers/date');

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
        opportunities: opportunities.bind(this, event.opportunities)
    }
};

const transformOpportunity = opportunity => {
    return {
        ...opportunity._doc,
        _id: opportunity.id,
        date: dateToString(opportunity._doc.date),
        creator: user.bind(this, opportunity.creator),
        event: singleEvent.bind(this, opportunity.event),
        createdAt: dateToString(opportunity._doc.createdAt),
        updatedAt: dateToString(opportunity._doc.updatedAt)
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

const opportunities = async opportunityIds => {
    try {
        const opportunities = await Opportunity.find({ _id: { $in: opportunityIds } });
        return opportunities.map(opportunity => {
            return transformOpportunity(opportunity);
        });
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
            createdOpportunities: opportunities.bind(this, user._doc.createdOpportunities)
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
exports.transformOpportunity = transformOpportunity;
