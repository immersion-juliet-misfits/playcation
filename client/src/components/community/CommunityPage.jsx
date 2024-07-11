import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityInput from "./CommunityInput.jsx";
import CommunityFeed from "./CommunityFeed.jsx";


const CommunityPage = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [makeAPost, setMakeAPost] = useState(false);

    useEffect(() => {
      getPosts()
      // console.log('STATE', posts)
    }, [])
  
    useEffect(() => {
      console.log('STATE', posts)
    }, [posts])

    useEffect(() => {
        console.log('STATE', makeAPost)
      }, [makeAPost])

    const handleDelete = (postId) => {
      axios.delete(`/community/post/${postId}`)
        .then(() => {
          console.log('Successfully deleted');
        })
        .catch((err) => {
          console.error(err);
        })
    }
  
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

    const toggleInput = () => {
      setMakeAPost((makeAPost) => !makeAPost)
    }

  return (
    <div>
    <h1>Playcay Community</h1>
    <h2>
    {`${user.username}'s Ventures`}
    </h2>
    {makeAPost && <CommunityInput getPosts={() => getPosts()} /> }
    <CommunityFeed posts={posts} toggleInput={() => toggleInput()} handleDelete={(postId) => handleDelete(postId)} />
    </div>
  )
}

export default CommunityPage;
