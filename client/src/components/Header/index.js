import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const logout = event => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>
        {/* set up our returning JSX to conditionally return different navigation 
          items depending on the outcome of the Auth.loggedIn(). If it returns true, 
          and we're logged in, we want to display navigation items tailored to the
          user. If it returns false, we'll display the default items for logging 
          in and signing up. */}
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
