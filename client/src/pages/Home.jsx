import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import '../index.css';
import logo from '../../src/assets/images/git-match-footer.png';

export const Home = () => {
  let loggedIn = localStorage.getItem('id_token');

  return (
    //if logged in, display dashboard, if not logged in, display Home/Splash page
    <main>
      <div>
        <div
          className='col-12 col-md-10 mb-3 p-3 d-flex flex-row justify-content-center'
          style={{ border: '1px solid #1a1a1a' }}
        >
          <img src={logo} />
        </div>
        <div className='col-12 col-md-8'>
          {loggedIn ? (
            <div>
              <Dashboard />
            </div>
          ) : (
            <>
              <Link to='/login' className='btn btn-lg m-2 gradient'>
                Login
              </Link>
              <Link to='/signup' className='btn btn-lg m-2 gradient'>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
