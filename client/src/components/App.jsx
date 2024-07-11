import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Planner from './planning/Planner.jsx';
import Login from './Login.jsx';
import NavDrawer from './NavDrawer.jsx';
import CommunityPage from './community/CommunityPage.jsx';
// import Reviews from "./reviews/Reviews.jsx"
// import Watchout from "./threats/Watchout.jsx"

// ES6 Class/Functional component
const App = () => {
  const [userName, setUsername] = useState('');

  useEffect(() => {
    axios.get('api/user')
      .then((res) => {
        const user = res.data;
        // set username
        setUsername(user.username);
      }).catch((err) => {
        console.error('Failed to GET user data: ', err);
      });
  }, []);

  return (
    <>
      {/* Replace NavDrawer with empty div on login */}
      {location.pathname === '/' ? (
        <div>Welcome to Playcation</div>
      ) : (
        <NavDrawer />
      )}
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Login />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/community" element={<CommunityPage user={userName} />} />
        {/* <Route path="/reviews" element={<Reviews />} /> */}
        {/* <Route path="/watchout" element={<Watchout />} /> */}
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
