import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost.jsx";


const CommunityFeed = ({posts, handleDelete, getPosts, user}) => {

  return (
    <div>
    <ul>
      {posts.map((post, i) => (
        <CommunityPost key={`${post.title}-${i}`} id={post.id} title={post.title} body={post.body} postOwner={post.user_id} url={post.url} postDate={post.updatedAt} handleDelete={handleDelete} getPosts={getPosts} user={user} />
        // <li>{post.title}</li>
      ))}
    </ul>
    </div>
  )
}

export default CommunityFeed;