import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_USER, QUERY_USERS } from '../utils/queries';
import AuthService from '../utils/auth';
import { Modal, Button } from 'react-bootstrap';

export const Profile = () => {
  const { githubUser } = useParams();
  const { loading, data } = useQuery(
    githubUser ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { githubUser: githubUser },
    }
  );

  const usersData = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};

  if (loading) return <div>Loading...</div>;

  let loggedIn = false;

  if (
    AuthService.loggedIn() &&
    AuthService.getProfile().data.githubUser === githubUser
  ) {
    loggedIn = true;
  }
  if (!user?.githubUser) {
    return (
      <h4>
        You need to be logged in to see this, use navigation links to sign or
        log in!
      </h4>
    );
  }
  return (
    <div className='container'>
      <div className='col-md-5'>
        <img src={user.avatar} alt='Avatar from github' />
      </div>
      <div className='col-md-5'>
        <div>
          <h5>{user.name}</h5>
          <p>{user.location}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};
