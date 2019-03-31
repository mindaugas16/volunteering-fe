const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Volunteer = require('../../models/Volunteer');

module.exports = {
    createVolunteer: async args => {
        try {
            const user = await Volunteer.findOne({ email: args.userInput.email });

            if (user) {
                throw new Error('User already exist!');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const createdUser = new Volunteer({
                email: args.userInput.email,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                postalCode: args.userInput.postalCode,
                password: hashedPassword,
            });
            const result = await createdUser.save();
            return {
                ...result._doc,
                _id: result.id,
                password: null
            }

        } catch (error) {
            throw error;
        }
    },
    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email });

            if (user) {
                throw new Error('User already exist!');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const createdUser = new User({
                email: args.userInput.email,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                postalCode: args.userInput.postalCode,
                password: hashedPassword,
            });
            const result = await createdUser.save();
            return {
                ...result._doc,
                _id: result.id,
                password: null
            }

        } catch (error) {
            throw error;
        }
    },
    login: async args => {
        const user = await User.findOne({ email: args.email });

        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(args.password, user.password);

        if (!isEqual) {
            throw new Error('Password is incorrect');
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            'somesupersecretkey',
            {
                expiresIn: '1h'
            }
        );

        return {
            userId: user.id,
            token,
            tokenExpiration: 1
        }
    },
    currentUser: async (args, req) => {
        if (!req.isAuth) {
            return null;
        }

        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            return {
                ...user._doc,
                _id: user.id,
                password: null
            };
        } catch (err) {
            throw err;
        }
    }
};
