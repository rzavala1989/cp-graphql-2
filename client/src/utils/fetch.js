import axios from 'axios';

const API = {
  //fetch the users from github
  fetchUser: async (user) => {
    await axios
      .get(`https://api.github.com/users/${user}`)
      .then((res) => {
        //populate the database
        const user = res.data;
        const results = {
          name: user.name,
          avatar: user.avatar_url,
          location: user.location,
          member_since: user.created_at,
          bio: user.bio,
        };
        return results;
      })
      .catch((e) => console.log(e));
  },
  //fetch a user's repos from GitHUb API
  fetchUserRepos: (user) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.github.com/users/${user}/repos`)
        .then((res) => {
          // console.log(res)
          const projects = res.data;
          // console.log('projects', projects);
          const results = projects?.map((project) => {
            return {
              name: project.name,
              description: project.description,
              repo_link: project.html_url,
            };
          });
          // console.log(results);
          resolve(results);
        })
        .catch((err) => reject(err));
    });
  },
  fetchLanguage: (user, repo) => {
    axios
      .get(`https://api.github.com/repos/${user}/${repo}/languages`)
      .then((res) => {
        return res;
      });
  },
};

export default API;
