const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Volunteer = require('../../models/volunteer');
const Organization = require('../../models/organization');

const isEmail = require('validator/lib/isEmail');

const { transformUser } = require('./merge');

const { UserRoles } = require('../../models/user-role.type');

const organizationResolver = require('../resolvers/organization');


module.exports = {
    createUser: async ({ userInput, userType }) => {
        try {
            let type = User;
            switch (userType) {
                case UserRoles.VOLUNTEER:
                    type = Volunteer;
                    break;
                case UserRoles.ORGANIZATION:
                    type = Organization;
                    break;
            }
            const user = await type.findOne({ email: userInput.email });

            if (user) {
                throw new Error('User already exist!');
            }

            const errors = [];

            if (!isEmail(userInput.email)) {
                errors.push({
                    email: 'invalidEmail'
                });
            }

            if (errors.length) {
                const error = new Error('Invalid input');
                error.data = errors;
                error.code = 400;
                throw error;
            }

            const hashedPassword = await bcrypt.hash(userInput.password, 12);
            const createdUser = new type({
                email: userInput.email,
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                postalCode: userInput.postalCode,
                password: hashedPassword,
            });


            organizationResolver.createOrganization();


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
    // createUser: async args => {
    //     try {
    //         const user = await User.findOne({ email: args.userInput.email });
    //
    //         if (user) {
    //             throw new Error('User already exist!');
    //         }
    //         const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    //         const createdUser = new User({
    //             email: args.userInput.email,
    //             firstName: args.userInput.firstName,
    //             lastName: args.userInput.lastName,
    //             postalCode: args.userInput.postalCode,
    //             password: hashedPassword,
    //         });
    //         const result = await createdUser.save();
    //         return {
    //             ...result._doc,
    //             _id: result.id,
    //             password: null
    //         }
    //
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    login: async (args, req) => {
        const errors = [];
        if (req.isAuth) {
            throw new Error('You\'re already logged in!');
        }

        if (!isEmail(args.email)) {
            const error = {
                message: 'Invalid email address',
            };
            errors.push(error);
        }

        if (errors.length) {
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const user = await User.findOne({ email: args.email });
        const isEqual = await bcrypt.compare(args.password, user.password);

        if (!user || !isEqual) {
            throw new Error('Invalid credentials.');
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

            return transformUser(user);
        } catch (err) {
            throw err;
        }
    }
};
