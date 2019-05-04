const User = require('../../models/user');

const { transformUser } = require('./merge');
const isNumeric = require('validator/lib/isNumeric');

module.exports = {
    // currentUser: async (args, req) => {
    //     if (!req.isAuth) {
    //         return null;
    //     }
    //
    //     try {
    //         const user = await User.findById(req.userId);
    //         if (!user) {
    //             throw new Error('User not found.');
    //         }
    //
    //         return transformUser(user);
    //     } catch (err) {
    //         throw err;
    //     }
    // }
    updateUserInfo: async ({ userInput }, req) => {
        if (!req.isAuth) {
            const error = new Error('Unauthenticated');
            error.code = 401;
            throw error;
        }

        try {
            const errors = [];
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            if (!userInput.firstName) {
                errors.push({
                    firstName: 'required',
                });
            }

            if (!userInput.lastName) {
                errors.push({
                    lastName: 'required',
                });
            }

            if (!isNumeric(userInput.postalCode)) {
                errors.push({
                    postalCode: 'numeric',
                });
            }

            if (errors.length) {
                const error = new Error('Invalid input');
                error.data = errors;
                error.code = 400;
                throw error;
            }

            user.firstName = userInput.firstName;
            user.lastName = userInput.lastName;
            user.postalCode = userInput.postalCode;

            const updatedUser = await user.save();
            return transformUser(updatedUser);
        } catch (err) {
            throw err;
        }
    },
};
