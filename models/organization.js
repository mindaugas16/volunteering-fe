const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: Schema.Types.Mixed
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);
