const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Organization {
    _id: ID!
    creator: User!
    members: [User!]!
    name: String!
    location: Location
    createdAt: String!
    updatedAt: String!
    events: [Event!]
}

type Activity {
    _id: ID!
    name: String!
    description: String!
    date: DateRange!
    creator: User!
    createdAt: String!
    updatedAt: String!
    event: Event!
}

type DateRange {
    start: String!
    end: String
}

type Location {
    place: String
    address: String
    city: String
    country: String
    postalCode: String
}

type Event {
    _id: ID!
    title: String!
    description: String!
    date: String!
    creator: User!
    activities: [Activity!]
    location: Location
    tags: [String!]
    Organization: ID!
}

type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    postalCode: String!
    password: String
    organizations: [Organization!]!
    createdEvents: [Event!]!
    createdActivities: [Activity!]!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Participation {
    volunteer: User!
    activity: Activity!
    additionalInformation: String
    createdAt: String!
    updatedAt: String!
}

input ActivityInput {
    name: String!
    description: String!
    date: DateRangeInput!
    eventId: ID!
}

input OrganizationInput {
    creatorId: ID
    name: String!
    location: LocationInput
}

input DateRangeInput {
    start: String!
    end: String
}

input EventInput {
    title: String!
    description: String!
    date: String!
    location: LocationInput
    organizationID: ID!
}

input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    postalCode: String!
}

input LocationInput {
    place: String
    address: String!
    city: String!
    country: String!
    postalCode: String!
}

input ParticipationInput {
    activityId: ID!
    additionalInformation: String
}

type RootQuery {
    event(eventId: ID!): Event!
    events(orderBy: String): [Event!]!
    activity(activityId: ID!): Activity!
    activities: [Activity!]!
    organization(organizationId: ID!): Organization!
    organizations: [Organization!]!
    login(email: String!, password: String!): AuthData!
    participations: [Participation!]!
    currentUser: User!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createVolunteer(userInput: UserInput): User
    createActivity(activityInput: ActivityInput): Activity
    participate(participationInput: ParticipationInput): Participation
    createOrganization(organizationInput: OrganizationInput): Organization
    joinOrganization(organizationId: ID): Boolean
    leaveOrganization(organizationId: ID): Boolean
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
