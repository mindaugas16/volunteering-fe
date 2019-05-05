const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    contacts: {
        type: String
    },
    bio: {
        type: String
    },
    role: {
        type: Number
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    createdActivities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    organizations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ],
});

module.exports = mongoose.model('User', userSchema);

