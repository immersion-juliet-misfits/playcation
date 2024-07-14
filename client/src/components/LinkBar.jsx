import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

const LinkBar = () => {
  const logout = () => {
    axios.post("/auth/logout").catch((err) => {
      console.error("Could not logout: ", err);
    });
  };

  return (
    <>
      <Link to="/home">
        <Button variant="outlined">
          <HomeIcon />Home
        </Button>
      </Link>
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
      <Link to="/">
        <Button variant="outlined" onClick={logout}>
          <LogoutIcon />
          Logout
        </Button>
      </Link>
    </>
  );
};

export default LinkBar;
