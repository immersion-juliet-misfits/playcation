import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost.jsx";


const CommunityFeed = ({posts}) => {

  return (
    <div>
    <h2>Playcay Daily Feed</h2><button>Make a Post</button>
    <ul>
      {posts.map((post, i) => (
        <CommunityPost key={`${post.title}-${i}`} title={post.title} body={post.body} postDate={post.updatedAt} />
        // <li>{post.title}</li>
      ))}
    </ul>
    </div>
  )
}

export default CommunityFeed;