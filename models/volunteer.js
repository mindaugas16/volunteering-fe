const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user');

const volunteerSchema = new Schema({
    extra: {
        type: String
    }
});

module.exports = User.discriminator('Volunteer', volunteerSchema);
