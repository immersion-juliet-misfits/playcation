import React, { useState, Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import Reviews from "./review/Reviews.jsx"

// ES6 Class/Functional component
const App = () => {
  return (
    <>
      <div>
        <h1>Hello Subjects</h1>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
        <Route path="/review" element={<Reviews />} />
      </Routes>
    </>
  );
};

export default App;