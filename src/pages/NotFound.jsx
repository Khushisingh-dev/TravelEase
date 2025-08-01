import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>It seems you're lost in transit...</p>
      <Link to="/" className="home-link">Back to Home</Link>
    </div>
  );
};

export default NotFound;
