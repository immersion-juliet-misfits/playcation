import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload.jsx";


const CommunityInput = ({getPosts, userId}) => {
  const [user_id] = useState(userId)  
  const [title, setPostTitle] = useState('')
  const [body, setPostBody] = useState('');
  const [url, setPostUrl] = useState('');

  // computer property to reuse logic?
  const handleTitleChange = (e) => {
    console.log(e.target.value)
    console.log(user_id)
    setPostTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    console.log(e.target.value)
    setPostBody(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log(e.target.value)
    axios.post('/community/post', {
      user_id,
      title,
      body,
      url
    })
    .then(() => {
      getPosts()
    })
  }

  const handleUpload = (url) => {
    console.log(url)
    setPostUrl(url)
  }

  const cloudName = process.env.NEXT_PUBLIC_TEST_KEY;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;


  console.log(cloudName, 'CNAMEHERE')

  return (
    <div>
    <h2>Playcay Ventures</h2>
    {/* <form> */}
      <label htmlFor="commtitle">Venture Location:</label><br/>
      <input id="commtitle" type="text" placeholder="Where'd you go?" value={title}  onChange={(e) => handleTitleChange(e)} /><br/><br/>

      <label htmlFor="commbody">Venture Story:</label><br/>
      <textarea id="commtitle" type="text" placeholder="Share your experience" value={body} onChange={(e) => handleBodyChange(e)}/><br/><br/>
      
      <label htmlFor="comm">Venture Snapshot:</label><br/>
      <input id="commtitle" type="file"></input><br/><br/>
      
      <input type="button" value="Post Venture" onClick={(e) => handleSubmit(e)} />
      <ImageUpload cloudName={cloudName} uploadPreset={uploadPreset} handleUpload={handleUpload} />
    {/* </form> */}

    {/* <h2>Playcay Plans</h2>
    <form>
      <label htmlFor="commtitle">Venture Location:</label><br/>
      <input id="commtitle" type="text" placeholder="Where'd you go?"/><br/><br/>
      <label htmlFor="commtitle">Venture Stop:</label><br/>
      <input id="commtitle" type="text" placeholder="A place worth visiting"/><br/>
      <textarea id="commtitle" maxLength="111" type="text" placeholder="Short description" /><br/>
      <input type="button" value="Add Stop" /><br/><br/>

            
      <input type="submit" value="Post Plan" />
    </form>

    <h2>Playcay Fun</h2>
    <form>
      <label htmlFor="commtitle">Venture Location:</label><br/>
      <input id="commtitle" type="text" placeholder="Where'd you go? (this will be hidden)"/><br/><br/>
      <label htmlFor="commtitle">Venture Hint 1:</label><br/>
      <textarea id="commtitle" maxLength="50" type="text" placeholder="Short hint 1" /><br/>
      <label htmlFor="commtitle">Venture Hint 2:</label><br/>
      <textarea id="commtitle" maxLength="50" type="text" placeholder="Short hint 2" /><br/>
      <label htmlFor="commtitle">Venture Hint 3:</label><br/>
      <textarea id="commtitle" maxLength="50" type="text" placeholder="Short hint 3" /><br/>
            
      <input type="submit" value="Post Fun" />
    </form> */}
    </div>
  )
}

export default CommunityInput;