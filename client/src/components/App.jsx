import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import Planner from "./planning/Planner.jsx";
import Login from "./Login.jsx";
import NavDrawer from "./NavDrawer.jsx";
import CommunityPage from "./community/CommunityPage.jsx";
import Reviews from "./reviews/Reviews.jsx"
// import Watchout from "./threats/Watchout.jsx"
import Profile from "./Profile.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Button } from "@mui/icons-material";
import LinkBar from "./LinkBar.jsx";

// ES6 Class/Functional component
const App = () => {
  const [user, setuser] = useState({});

  const add = (data) => {
    setuser(data);
  };

  // NavDrawer state and toggle function
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };


  return (
    <>

      {/* Replace NavDrawer with empty div on login */}
      {location.pathname === "/" ? <div>Welcome to Playcation</div> :
       (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LinkBar />
          {/* <Button onClick={toggleDrawer}><MenuIcon /></Button >
          <Drawer open={open} onClose={toggleDrawer} >
            <NavDrawer />
          </Drawer > */}
        </div>
        )
      }
      <Routes>
        <Route path="/home" element={<Homepage add={add} />} />
        <Route path="/" element={<Login />} />
        <Route path="/planner" element={<Planner user={user} />} />
        <Route path="/community" element={<CommunityPage user={user} />} />
        <Route path="/reviews" element={<Reviews user={user} />} />
        {/* <Route path="/watchout" element={<Watchout />} /> */}
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App;
