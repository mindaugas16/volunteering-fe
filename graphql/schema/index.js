const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
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
}

type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    postalCode: String!
    password: String
    createdEvents: [Event!]!
    createdActivities: [Activity!]!
}

type AuthData {
    userId: ID!
    email: String!
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

input DateRangeInput {
    start: String!
    end: String
}

input EventInput {
    title: String!
    description: String!
    date: String!
    location: LocationInput
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
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    participations: [Participation!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    createActivity(activityInput: ActivityInput): Activity
    participate(participationInput: ParticipationInput): Participation
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
