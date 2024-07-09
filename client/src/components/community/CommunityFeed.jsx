import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost.jsx";


const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
    // console.log('STATE', posts)
  }, [])

  useEffect(() => {
    // getPosts()
    console.log('STATE', posts)
  }, [posts])

  const getPosts = () => {
    axios.get('/community/post')
      .then(({data}) => {
        console.log('Invoked from client', data)
        setPosts(data)
      })
      .catch((err) => {
        console.error('NOT Invoked from client', err)
      })
  }

  return (
    <div>
    <h2>Playcay Daily Feed</h2><button>Make a Post</button>
    <ul>
      {posts.map((post) => (
        <CommunityPost title={post.title} body={post.body} />
        // <li>{post.title}</li>
      ))}
    </ul>
    </div>
  )
}

export default CommunityFeed;