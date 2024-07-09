import React, { useState } from "react";
import axios from "axios";
import CommunityInput from "./CommunityInput.jsx";
import CommunityFeed from "./CommunityFeed.jsx";


const CommunityPage = () => {
  return (
    <div>
    <h1>Playcay Community</h1>
    <CommunityInput />
    <CommunityFeed />
    </div>
  )
}

export default CommunityPage;
