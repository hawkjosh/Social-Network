const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    github: String
    password: String!
    posts: [Post]
  }
  type Post {
    _id: ID!
    postText: String!
    postAuthor: String!
    createdAt: String!
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    currUser: User
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      github: String
    ): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    updatePost(_id: ID!, postText: String!): Post
    removePost(postId: ID!): Post
  }
`

module.exports = typeDefs