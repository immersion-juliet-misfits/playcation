import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Drawer, Icon, List, ListItem, Topography} from '@mui/material';
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const NavDrawer = () => {

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

export default NavDrawer;
