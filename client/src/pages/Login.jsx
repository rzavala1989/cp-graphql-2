import React, { useState } from 'react';
import AuthService from '../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
//import {LOGIN_USER} from '../utils/mutations

export const Login = () => {
  const [formState, setFormState] = useState({ githubUser: '', password: '' });
  //state for pur mutation here
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // const handleSubmit

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header bg-dark text-light p-2'>Login</h4>
          <div className='card-body'>
            <form>
              <input
                className='form-input'
                placeholder='Your Github Username'
                name='githubUser'
                type='user'
                value={formState.githubUser}
                onChange={handleChange}
              />
              <input
                className='form-input'
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
          </div>
        </div>
      </div>
    </main>
  );
};
