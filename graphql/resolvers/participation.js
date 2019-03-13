const Participation = require('../../models/participation');
const User = require('../../models/user');
const Activity = require('../../models/event');
const { transformParticipation } = require('./merge');


module.exports = {
    participations: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const participations = await Participation.find({ volunteer: req.userId });
            return participations.map(participation => {
                return transformParticipation(participation);
            });
        } catch (err) {
            throw err;
        }
    },
    participate: async (args, req) =>  {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedActivity = await Activity.findById(args.participationInput.activityId);

        const participation = new Participation({
            volunteer: req.userId,
            activity: args.participationInput.activityId,
            additionalInformation: args.participationInput.additionalInformation,
        });
        try {
            const result = await participation.save();
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.participations.push(result);
            await user.save();

            if (!fetchedActivity) {
                throw new Error('Activity not found.');
            }
            fetchedActivity.participations.push(result);
            await fetchedActivity.save();

            return result;
        } catch (err) {
            throw err;
        }
    }
};
