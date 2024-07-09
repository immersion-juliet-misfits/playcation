import React, { useState } from "react";
import axios from "axios";

const CommunityPost = ({title, body}) => {
  return (
    <div>
    <h3>{title}</h3>
    <p>{body}</p>
    </div>
  )
}

export default CommunityPost;
