import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoText from '../assets/images/logo-text.png';

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className='bg-dark text-light mb-4 py-3 align-center'>
      <div className='container text-center mb-5'>
        {location.pathname !== '/' && (
          <button className='btn btn-dark mb-3' onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h5>Ricardo Zavala | Clever Programmer</h5>
        <img
          src={logoText}
          alt='white and pink Git Match logo'
          style={{ width: '300px', padding: '20px' }}
        />
        <div>
          <button
            className='btn btn-dark mb-3'
            onClick={() => navigate('/about')}
          >
            ABOUT US!
          </button>
        </div>
      </div>
    </footer>
  );
};
