import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { useQuery, useState, useMutation } from '@apollo/client';
import { Matches } from '../components/Matches';

import Auth from '../utils/auth';

export const Dashboard = () => {
  // const { githubUser } = useParams();

  const { loading, data } = useQuery(QUERY_ME);
  if (loading) {
    return (
      <div className='spinner-grow text-danger' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }
  const user = data?.me;
  user && console.log(user);

  return (
    <div className='d-flex flex-column justify-content-center'>
      <h5>{Auth.getProfile().data.githubUser}'s Dashboard</h5>
      <h4>Users Matches</h4>
      <div>
        {data?.me.match.map((match) => (
          <Matches key={match.githubUser2} githubUser2={match.githubUser2} />
        ))}
      </div>
    </div>
  );
};
