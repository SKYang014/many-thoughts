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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        #  the exclamation point ! after the query parameter data type definitions 
        # indicates that for that query to be carried out, that data must exist. 
        # Otherwise, Apollo will return an error to the client making the request 
        # and the query won't even reach the resolver function associated with it.
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        # Note that addReaction() will return the parent Thought instead of the 
        # newly created Reaction. This is because the front end will ultimately 
        # track changes on the thought level, not the reaction level.
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
    }
`;

// export the typeDefs
module.exports = typeDefs;