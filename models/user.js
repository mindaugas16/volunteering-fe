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
    participatingEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    participations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participation'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);

