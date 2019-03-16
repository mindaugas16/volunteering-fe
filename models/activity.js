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
        type: Schema.Types.Mixed
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
        ref: 'Event',
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    participations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participation'
        }
    ],
    requirements: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
