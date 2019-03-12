const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Opportunity {
    _id: ID!
    name: String!
    description: String!
    date: String!
    creator: User!
    location: Location!
    createdAt: String!
    updatedAt: String!
    event: Event!
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
    opportunities: [Opportunity!]
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]!
    createdOpportunities: [Opportunity!]!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input OpportunityInput {
    name: String!
    description: String!
    location: LocationInput!
    date: String
    eventId: ID!
}

input EventInput {
    title: String!
    description: String!
    date: String!
}

input UserInput {
    email: String!
    password: String!
}

input LocationInput {
    place: String
    address: String!
    city: String!
    country: String!
    postalCode: String!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    opportunities: [Opportunity!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    createOpportunity(opportunityInput: OpportunityInput): Opportunity
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
