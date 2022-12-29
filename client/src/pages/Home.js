import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME);

  // Optional chaining negates the need to check if an object even exists before a
  // ccessing its properties. In this case, no data will exist until the query to 
  // the server is finished. So if we type data.thoughts, we'll receive an error 
  // saying we can't access the property of data—because it is undefined.

  // What we're saying is, if data exists, store it in the thoughts constant we just 
  // created. If data is undefined, then save an empty array to the thoughts 
  // component.

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
        )}
      </div>
      {loggedIn && userData ? (
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
          />
        </div>
      ) : null}

    </main>
  );
};
export default Home;
