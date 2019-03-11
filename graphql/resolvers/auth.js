const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email });

            if (user) {
                throw new Error('User already exist!');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const createdUser = new User({
                email: args.userInput.email,
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
    }
};
