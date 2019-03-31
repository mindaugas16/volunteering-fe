const User = require('../../models/user');
const Organization = require('../../models/organization');
const { transformOrganization } = require('./merge');

module.exports = {
    createOrganization: async (args, req) => {
        if (!req.isAuth && !args.organizationInput.creatorId) {
            throw new Error('Unauthenticated!');
        }

        try {
            const creatorId = req.userId || args.organizationInput.creatorId;
            const user = await User.findById(creatorId);
            if (!user) {
                throw new Error('User not found.');
            }

            const organization = new Organization({
                name: args.organizationInput.name,
                location: args.organizationInput.location,
                creator: creatorId
            });
            const result = await organization.save();

            user.organizations.push(organization);
            await user.save();
            return transformOrganization(result);
        } catch (err) {
            throw err;
        }
    },
    organizations: async () => {
        try {
            const organization = await Organization.find();
            return organization.map(event => {
                return transformOrganization(event);
            });
        } catch (err) {
            throw err;
        }
    },
    organization: async (args) => {
        try {
            const organization = await Organization.findById(args.organizationId);
            return transformOrganization(organization);
        } catch (err) {
            throw err;
        }
    },
    joinOrganization: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error('Unauthenticated');
            error.code = 400;
            throw error;
        }

        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            const organization = await Organization.findById(args.organizationId);

            if (!organization) {
                throw new Error('Organization not found.');
            }
            if (user.organizations.indexOf(organization._id) > -1 || organization.members.indexOf(user._id) > -1) {
                throw new Error('You already joined this group');
            }

            organization.members.push(user._id);
            await organization.save();

            user.organizations.push(args.organizationId);
            await user.save();

            return true;
        } catch (err) {
            throw err;
        }
    },
    leaveOrganization: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error('Unauthenticated');
            error.code = 400;
            throw error;
        }

        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not found.');
            }

            const organization = await Organization.findById(args.organizationId);

            if (!organization) {
                throw new Error('Organization not found');
            }
            if (user.organizations.indexOf(organization._id) === -1 || organization.members.indexOf(user._id) === -1) {
                throw new Error('You already left this group');
            }

            organization.members.pull(user._id);
            await organization.save();

            user.organizations.pull(args.organizationId);
            await user.save();

            return true;
        } catch (err) {
            throw err;
        }
    }
};
