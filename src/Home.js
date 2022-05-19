import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <h2>Home page</h2>

        <Link to="/login">Login</Link>

        <Link to="/signup">Sign up</Link>
      </nav>
    </div>
  );
};

export default Home;
