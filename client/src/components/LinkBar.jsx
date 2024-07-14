import React from 'react';
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const LinkBar = () => {
  return (
    <>
      <Link to="/profile">
        <Button variant="outlined">Profile</Button>
      </Link>
      <Link to="/community">
        <Button variant="outlined">Community</Button>
      </Link>
      <Link to="/reviews">
        <Button variant="outlined">Reviews</Button>
      </Link>
      <Link to="/watchout">
        <Button variant="outlined">Watchout</Button>
      </Link>
      <Link to="/planner">
        <Button variant="outlined">Planner</Button>
      </Link>
    </>
  );
};


export default LinkBar;
