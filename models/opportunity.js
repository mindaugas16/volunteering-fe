const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
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
    location: {
        type: Schema.Types.Mixed,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    tags: [
        {
            type: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
