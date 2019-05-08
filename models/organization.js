const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user');

const organizationSchema = new Schema({
    name: {
        type: String,
        // required: true
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
});

// module.exports = mongoose.model('Organization', organizationSchema);
module.exports = User.discriminator('Organization', organizationSchema);
