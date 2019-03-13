const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participationSchema = new Schema({
    volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    additionalInformation: {
        type: String
    }
}, { timestamp: true });

module.exports = mongoose.model('Participation', participationSchema);
