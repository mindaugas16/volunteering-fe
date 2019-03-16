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
        type: Schema.Types.Mixed
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
    sponsors: [
        {
            type: String
        }
    ],
    categories: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);
