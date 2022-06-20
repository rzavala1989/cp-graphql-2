import React, { useState } from 'react';
import AuthService from '../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

export const Login = () => {
  const [formState, setFormState] = useState({ githubUser: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
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
      const { data } = await login({
        variables: { ...formState },
      });
      AuthService.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    //after logging in, set form back to blank state
    setFormState({
      githubUser: '',
      password: '',
    });
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header bg-dark text-light p-2'>Login</h4>
          <div className='card-body'>
            {data ? (
              <p>
                You are logged in! You may now head{' '}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
