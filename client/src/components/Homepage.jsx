import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';


function Homepage({ add }) {
  // const [userName, setUsername] = useState('');

  useEffect(() => {
    axios.get('api/user')
      .then((res) => {
        const user = res.data;
        // set username
        // setUsername(user.username);
        add(user)
      }).catch((err) => {
        console.error('Failed to GET user data: ', err);
      });
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/profile">
        <Button variant="outlined" >Profile</Button>
      </Link>
      <Link to="/community">
        <Button variant="outlined" >Community</Button>
      </Link>
      <Link to="/reviews">
        <Button variant="outlined" >Reviews</Button>
      </Link>
      <Link to="/watchout">
        <Button variant="outlined" >Watchout</Button>
      </Link>
      <Link to="/planner">
        <Button variant="outlined" >Planner</Button>
      </Link>
    </div>
  );
};

export default Homepage;