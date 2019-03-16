const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: Schema.Types.Mixed,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    volunteers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    sponsors: [
        {
            type: String
        }
    ],
    requiredSkills: [
        {
            type: String,
        }
    ],
    categories: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);
