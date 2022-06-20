const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    githubUser: String!
    password: String!
    name: String
    avatar: String
    url: String
    location: String
    member_since: String
    email: String!
    projects: [Project]
    bio: String
    swipeRight: [SwipeRight]
    match: [Match]
  }

  type SwipeRight {
    githubUser2: String
  }
  type Match {
    githubUser2: String
  }

  type Project {
    name: String!
    description: String
    repo_link: String
    language: [Language]
  }

  type Language {
    language: String
    count: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]
    user(githubUser: String!): User
    allProjects: [Project]
    projects(githubUser: String): [Project]
    me: User
  }

  type Mutation {
    login(githubUser: String!, password: String!): Auth
    signup(githubUser: String!, email: String!, password: String!): Auth
    addProject(name: String!, githubUser: String!): Project
    addMatch(githubUser: String!, githubUser2: String!): User
    addSwipe(githubUser: String!, githubUser2: String!): User
    removeUser(githubUser: ID!): User
  }
`;

module.exports = typeDefs;
