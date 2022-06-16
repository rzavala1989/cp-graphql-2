const axios = require('axios');
// const fetch = require('node-fetch');
const { User, Project } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { githubUser }) => {
      return User.findOne({ githubUser });
    },
    allProjects: async () => {
      return Project.find();
    },
    projects: async (parent, { githubUser }) => {
      return Project.find(params);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You must be logged in to do that!');
    },
  },
  Mutation: {
    login: async (parent, { githubUser, password }) => {
      const user = await User.findOne({ githubUser });
      if (!user) {
        throw AuthenticationError("User doesn't exist!!!");
      }
      //make sure password/username is correct

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, { githubUser, email, password }) => {
      //create results object
      //provide an empty array for projects
      //hook up api calls for the projects
      //hook up api calls for languages
      //hook up api calls for user and other users
      let results = {};
      let projectsArr = [];

      //API CALLS FOR USERS
      const apiUser = async () => {
        try {
          const userResponse = await axios.get(
            `https://api.github.com/users/${githubUser}`
          );
          // console.log('USER RESPONSE: ', userResponse);

          results = {
            name: userResponse.data.name,
            avatar: userResponse.data.avatar_url,
            location: userResponse.data.location,
            member_since: userResponse.data.created_at,
            bio: userResponse.data.bio,
            //projectsArr = [....
            //   ...
            //  langArr = []]
          };
        } catch (error) {
          console.log('ERROR: ', error);
        }
      };
      //API CALLS FOR PROJECTS
      const apiProjects = async () => {
        try {
          const projectResponse = await axios.get(
            `https://api.github.com/users/${githubUser}/starred`
          );

          const projectData = projectResponse.data;

          for (var i = 0; i < projectData.length; i++) {
            //for each project, make call for languages on that project

            let repoName = projectData[i].name;

            console.log(repoName);

            const singleProjectInfo = {
              name: projectData[i].name,
              description: projectData[i].description,
              repo_link: projectData[i].html_url,
            };

            projectArr.push(singleProjectInfo);

            //for each project, wait until we get the lang array
            const langArr = [];

            //-------------nested API call for LANGUAGES----------------------------------
            const langResponse = await axios.get(
              `https://api.github.com/repos/${githubUser}/${repoName}/languages`
            );

            const langData = langResponse.data;

            for (lang in langData) {
              const language = {
                language: lang,
                count: langData[lang],
              };
              langArr.push(language);
            }

            //set a key of languages with the array on each project
            singleProjectInfo.languages = langArr;
          }
        } catch (err) {
          console.error(err);
          console.error('Error in projects call');
        }
      };
      // wait for user data
      await apiUser();
      // once we have userData, get project data
      await apiProjects();
      //now within call project api call, make the language call for EACH project
      results.projects = projectsArr;

      //NOW.... we actually create our user
      const user = User.create({
        githubUser,
        email,
        password,
        ...results,
      });
      const token = signToken(user);
      return { token, user };
    },
    addProject: async (
      parent,
      { githubUser, name, description, repo_link }
    ) => {
      const project = Project.create({
        githubUser,
        name,
        repo_link,
        description,
      });
      //Add this project to the user's project array
      User.findOneAndUpdate(
        { githubUser: githubUser },
        { $addToSet: { projects: project._id } }
      );
      return project;
    },

    addSwipe: async (parent, { githubUser, githubUser2 }) => {
      const swipeRight = await User.findOneAndUpdate(
        { githubUser: githubUser },
        {
          $addToSet: {
            swipeRight: { githubUser2: githubUser2 },
          },
        },
        { new: true }
      );
      return swipeRight;
    },

    // to create a match, we want to add the target user id onto the
    // match array of the logged in user.
    //github user 1 is doing the swiping. user2 is getting swiped on
    addMatch: async (parent, { githubUser, githubUser2 }, context) => {
      const match = await User.updateOne(
        { githubUser: githubUser },
        {
          $addToSet: {
            match: { githubUser2: githubUser2 },
          },
        },
        { new: true }
      );
      return match;
    },

    //remove user
    removeUser: async (parent, args) => {
      return User.findOneAndDelete(arg.id);
    },
  },
};

module.exports = resolvers;
