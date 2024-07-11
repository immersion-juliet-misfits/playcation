import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost.jsx";


const CommunityFeed = ({posts, toggleInput, handleDelete}) => {

  return (
    <div>
    <h2>Playcay Daily Feed</h2><button onClick={toggleInput}>Make a Post</button>
    <ul>
      {posts.map((post, i) => (
        <CommunityPost key={`${post.title}-${i}`} id={post.id} title={post.title} body={post.body} url={post.url} postDate={post.updatedAt} handleDelete={handleDelete} />
        // <li>{post.title}</li>
      ))}
    </ul>
    </div>
  )
}

export default CommunityFeed;