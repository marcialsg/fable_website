import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (  
  <div>
    <h1>404 - Invalid</h1>
    <Link to="/">Go Home</Link>
  </div>);
}

export default NotFound;