// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        users: [User]
        #  the exclamation point ! after the query parameter data type definitions 
        # indicates that for that query to be carried out, that data must exist. 
        # Otherwise, Apollo will return an error to the client making the request 
        # and the query won't even reach the resolver function associated with it.
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
`;

// export the typeDefs
module.exports = typeDefs;