import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AuthService from '../utils/auth';
import logo from '../assets/images/git-match-nav.png';
import 'bootstrap/dist/css/bootstrap.min.css';
//

export const Header = () => {
  const logout = (e) => {
    e.preventDefault();
    //TODO log out a logged in user
    //AuthService.logout()
    console.log('logged out!');
  };

  return (
    <header className='dark text-light mb-4 py-3 align-center'>
      <Navbar bg='dark' expand='lg'>
        <Container>
          <Navbar.Brand>
            <Link to='/' className='text-light'>
              <img src={logo} alt='Gitmatch logo' style={{ width: '300px' }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Nav className='me-auto'>
            <div className='col'>
              <p className='m-0'>Developer Community Hub</p>
            </div>
          </Nav>
          {/* <Nav>
            {AuthService.loggedIn() ? (
              <>
                <Nav>
                  <span>Hello, {AuthService.getProfile().data.name}</span>
                </Nav>
                <Nav>
                  <button className='btn btn-lg m-2 gradient' onClick={logout}>
                    Logout
                  </button>
                </Nav>
                <Nav>
                  <Link to='/profiles'>
                    <button className='btn btn-lg m-2 gradient'>
                      My Profile
                    </button>
                  </Link>
                </Nav>
                <Nav>
                  <Link to='/'>
                    <button className='btn btn-lg m-2 gradient'>Home</button>
                  </Link>
                </Nav>
              </>
            ) : (
              <></>
            )}
          </Nav> */}
        </Container>
      </Navbar>
    </header>
  );
};
