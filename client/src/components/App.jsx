import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import Planner from "./planning/Planner.jsx";
import Login from "./Login.jsx";
import CommunityPage from "./community/CommunityPage.jsx";
import Reviews from "./reviews/Reviews.jsx"
// import Watchout from "./threats/Watchout.jsx"
import Profile from "./Profile.jsx";
import LinkBar from "./LinkBar.jsx";

const App = () => {
  const [user, setuser] = useState({});

  const add = (data) => {
    setuser(data);
  };
  return (
    <>
      {/* Replace LinkBar with empty div on login */}
      {location.pathname === "/" ? <div>Welcome to Playcation</div> :
       (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LinkBar />
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
