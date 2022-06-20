import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import API from '../utils/fetch';

export const Signup = () => {
  const [formState, setFormState] = useState({
    githubUser: '',
    password: '',
    email: '',
  });
  const [signup, { error, data }] = useMutation(ADD_USER);

  //state for pur mutation here
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedUser = await API.fetchUser(formState.githubUser);
      console.log(fetchedUser);
      const { data } = await signup({
        variables: { ...formState },
      });
      console.log(data);
      AuthService.login(data.signup.token);
    } catch (e) {
      console.error(e);
    }
    //after logging in, set form back to blank state
    setFormState({
      githubUser: '',
      email: '',
      password: '',
    });
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header bg-dark text-light p-2'>Sign Up</h4>
          <p className='my-4 mx-4'>Please sign up with your Github username</p>
          <div className='card-body'>
            {data ? (
              <p>
                You are signed up! You may now head{' '}
                <Link to='/'>back to the homepage!</Link>
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  className='form-input form-control w-50 mb-3'
                  placeholder='Your Github Username'
                  name='githubUser'
                  type='user'
                  value={formState.githubUser}
                  onChange={handleChange}
                />
                <input
                  className='form-input form-control w-50 mb-3'
                  placeholder='Your github email address'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input form-control w-50 mb-3'
                  placeholder='Enter password'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className='btn btn-block btn-primary gradient'
                  style={{ cursor: 'pointer' }}
                  type='submit'
                >
                  Submit
                </button>
              </form>
            )}
            {error && (
              <div className='my-3 p-3 bg-danger text-white'>
                {error.message}
                {console.log(error)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
