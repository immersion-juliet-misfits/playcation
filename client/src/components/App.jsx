import React, { useState, Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import Planner from "./planning/Planner.jsx"
import NavDrawer from "./NavDrawer.jsx"
// import CommunityPage from "./community/CommunityPage.jsx"
// import Reviews from "./reviews/Reviews.jsx"
// import Watchout from "./threats/Watchout.jsx"

// ES6 Class/Functional component
const App = () => {
    return (
      <>     
      <NavDrawer /> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/planner" element={<Planner />} />
        {/* <Route path="/community" element={<CommunityPage />} /> */}
        {/* <Route path="/reviews" element={<Reviews />} /> */}
        {/* <Route path="/watchout" element={<Watchout />} /> */}
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
      </> 
    );
};

export default App;