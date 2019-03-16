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
    postalCode: {
        type: String
    },
    contacts: {
        type: String
    },
    bio: {
        type: String
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
    participations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participation'
        }
    ],
    skills: [
        {
            type: String
        }
    ],
    interests: [
        {
            type: String
        }
    ],
    organizations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ],
    achievements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Achievement'
        }
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participation'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);

