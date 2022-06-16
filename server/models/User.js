const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const emailValidate = (email) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(String(email).toLowerCase());
};

const userSchema = new Schema({
  githubUser: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: [emailValidate, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  url: {
    type: String,
  },
  location: {
    type: String,
  },
  member_since: {
    type: String,
  },
  bio: {
    type: String,
  },
  swipeRight: [
    {
      githubuser2: {
        type: String,
      },
    },
  ],
  match: [
    {
      githubuser2: {
        type: String,
      },
    },
  ],
  projects: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      repo_link: {
        type: String,
      },
      languages: [
        {
          language: {
            type: String,
          },
          count: {
            type: Number,
          },
        },
      ],
    },
  ],
});

userSchema.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }

  return next();
});
//create a pre-save middleware to create a password, compare incoming password to hashed password
//if they match, then return true, else return false
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
