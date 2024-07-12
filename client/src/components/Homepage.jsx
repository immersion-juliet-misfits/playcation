import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';

function Homepage() {
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
