const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    volunteersNeeded: {
        type: Number,
        default: 1
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
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
    participations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participation'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
