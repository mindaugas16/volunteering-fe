const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user');

const volunteerSchema = new Schema({
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

module.exports = User.discriminator('Volunteer', volunteerSchema);
