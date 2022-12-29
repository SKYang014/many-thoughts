import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_USER, QUERY_ME } from '../utils/queries';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { ADD_FRIEND } from '../utils/mutations';
import ThoughtForm from '../components/ThoughtForm';

const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  //Let's now add functionality to the Profile component definition to check if 
  // the logged-in user's username is the same as the parameter, and redirect if so

  // With this, we're checking to see if the user is logged in and if so, if the
  //  username stored in the JSON Web Token is the same as the userParam value. 
  // If they match, we return the <Navigate> component with the prop to set to the
  //  value /profile, which will redirect the user away from this URL and to the
  //  /profile route.
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>
      {/* Now navigate to the logged-in user's profile by clicking the Me link. 
      Test the thought form on this page. Unfortunately, the cache doesn't seem 
      to update here, and you're forced to reload the page to see the new thought.
      Why does it matter which page you're on if Profile and Home both use the 
      same ThoughtForm component?

      There are actually two things happening here:

      The Profile page relies on QUERY_ME (not QUERY_THOUGHTS) to populate the 
      thoughts, so updating the cache of the latter doesn't help.

      If you visit the /profile route without first visiting the homepage, 
      QUERY_THOUGHTS will have never been cached, resulting in an error when you 
      try to read and update it.

      To fix this issue, we'll first wrap the QUERY_THOUGHTS cache update in a 
      try...catch statement to prevent the error from blocking the next step. 
      That next step will be to update the thoughts array on the QUERY_ME cache. */}
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
