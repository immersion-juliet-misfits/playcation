import Reviews from "./reviews/Reviews.jsx"
import React, { useState, useEffect, Component } from 'react';
//import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Planner from './planning/Planner.jsx';
import Login from './Login.jsx';
import NavDrawer from './NavDrawer.jsx';
import CommunityPage from './community/CommunityPage.jsx';
// import Reviews from "./reviews/Reviews.jsx"
// import Watchout from "./threats/Watchout.jsx"
import Profile from './Profile.jsx';

// ES6 Class/Functional component
const App = () => {
  const [user, setuser] = useState({})

  const add = (data) => {
    setuser(data)
  }
  //const [user, setUser] = useState({});

  // useEffect(() => {
  //   axios.get('api/user')
  //     .then((res) => {
  //       const user = res.data;
  //       // set username
  //       setUser(user);
  //     }).catch((err) => {
  //       console.error('Failed to GET user data: ', err);
  //     });
  // }, []);

  return (
    <>
      {/* Replace NavDrawer with empty div on login */}
      {location.pathname === '/' ? (
        <div>Welcome to Playcation</div>
      ) : (
        <NavDrawer />
      )}
      <Routes>
        <Route path="/home" element={<Homepage add={add} />} />
        <Route path="/" element={<Login />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/community" element={<CommunityPage user={user} />} />
        <Route path="/reviews" element={<Reviews user={user} />} />
        {/* <Route path="/watchout" element={<Watchout />} /> */}
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
