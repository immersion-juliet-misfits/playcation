import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost.jsx";
import Box from '@mui/material/Box';


const CommunityFeed = ({posts, handleDelete, getPosts, user}) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <ul>
          {posts.map((post, i) => (
            <CommunityPost
              key={`${post.title}-${i}`}
              id={post.id}
              title={post.title}
              body={post.body}
              postOwner={post.user_id}
              url={post.url}
              postDate={post.updatedAt}
              handleDelete={handleDelete}
              getPosts={getPosts}
              user={user}
            />
          ))}
        </ul>
      </div>
    </Box>
  );
}

export default CommunityFeed;