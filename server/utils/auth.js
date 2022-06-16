const jwt = require('jsonwebtoken');

const secret = 'mysecret';
const expiresIn = '1h';

module.exports = {
  authMiddleware: ({ req }) => {
    //allows token to be sent via req body, req.query, and headers (optional)
    let token = req.body.token;
    //split token string, into array and return only only the token
    if (req.headers.authorization) {
      token = token.split(' ').pop.trim();
    }
    if (!token) return req;
    //if token can be verified for user, add the user's data to the request so it can be used in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiresIn });
      req.user = data;
    } catch {
      console.log('invalid token!!!');
    }
  },
  signToken: ({ email, githubUser, _id }) => {
    const payload = { email, githubUser, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiresIn });
  },
};
