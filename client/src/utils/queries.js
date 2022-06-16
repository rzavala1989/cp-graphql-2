import { gql } from '@apollo/client';

//get all users
export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      githubUser
      name
      avatar
      url
      projects {
        name
        description
        repo_link
        language {
          language
          count
        }
      }
      location
      swipeRight {
        githubUser2
      }
      match {
        githubUser2
      }
    }
  }
`;

//Get MY information
export const QUERY_ME = gql`
  query me {
    me {
      _id
      githubUser
      name
      avatar
      location
      bio
      email
      swipeRight {
        githubUser2
      }
      match {
        githubUser2
      }
      projects {
        name
        description
        repo_link
        language {
          language
          count
        }
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($githubUser: String!) {
    user(githubUser: $githubUser) {
      githubUser
      name
      url
      location
      email
      _id
      projects {
        name
        description
        repo_link
        language {
          language
          count
        }
      }
      bio
      swipeRight {
        githubUser2
      }
      match {
        githubUser2
      }
    }
  }
`;

export const QUERY_USER_PROJECTS = gql`
  query userProjects($githubUser: String!) {
    projects(githubUser: $githubUser) {
      name
      description
      repo_link
      languages {
        language
        count
      }
    }
  }
`;

export const QUERY_ALL_PROJECTS = gql`
  query allProjects {
    projects {
      name
      description
      repo_link
      languages {
        language
        count
      }
    }
  }
`;
