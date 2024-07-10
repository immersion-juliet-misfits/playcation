import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityInput from "./CommunityInput.jsx";
import CommunityFeed from "./CommunityFeed.jsx";


const CommunityPage = () => {
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
    <h1>Playcay Community</h1>
    <CommunityInput getPosts={() => getPosts()} />
    <CommunityFeed posts={posts} />
    </div>
  )
}

export default CommunityPage;
