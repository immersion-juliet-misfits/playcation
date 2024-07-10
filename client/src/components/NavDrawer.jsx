import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Drawer, Icon, List, ListItem, Topography} from '@mui/material';

const NavDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Temp Nav</Button>
      <Drawer open={open} onClose={toggleDrawer}></Drawer>
    </>
  );
};

export default NavDrawer;
