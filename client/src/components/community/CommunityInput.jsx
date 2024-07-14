import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload.jsx";


const CommunityInput = ({getPosts, userId}) => {
  const [user_id] = useState(userId)  
  const [title, setPostTitle] = useState('')
  const [body, setPostBody] = useState('');
  const [url, setPostUrl] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  
  const cloudName = process.env.NEXT_PUBLIC_TEST_KEY;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  // computer property to reuse logic?
  const handleTitleChange = (e) => {
    setPostTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setPostBody(e.target.value)
  }

  const handleSubmit = (e) => {
    axios.post('/community/post', {
      user_id,
      title,
      body,
      url
    })
    .then(() => {
      getPosts()
      setShowUpload(false);
    })
  }

  const toggleUpload = () => {
    setShowUpload((showUpload) => !showUpload)
  }
  
  const successUpload = () => {
    setImgUploaded((imgUploaded) => !imgUploaded)
  }

  const handleUpload = (url) => {
    setPostUrl(url)
    setShowUpload(false);
  }


  return (
    <div>
    <h2>Playcay Ventures</h2>
      <label htmlFor="commtitle">Venture Location:</label><br/>
      <input style={{ backgroundColor: '#7171D0', color: '#CCE8FF' }} id="commtitle" type="text" placeholder="Where'd you go?" value={title}  onChange={(e) => handleTitleChange(e)} /><br/><br/>

      <label htmlFor="commbody">Venture Story:</label><br/>
      <textarea style={{ backgroundColor: '#7171D0', color: '#CCE8FF' }} id="commtitle" type="text" placeholder="Share your experience" value={body} onChange={(e) => handleBodyChange(e)}/><br/><br/>
      
      {!imgUploaded && 
      <div>
        <label htmlFor="comm">Venture Snapshot:</label><br/>
        <h4>No image selected.</h4>
        <input id="commtitle" type="button" value="Upload Image" onClick={toggleUpload}></input><br/><br/>
      </div>
      }

      {imgUploaded &&
        <><h4>Venture Snapshot Uploaded</h4><br/></>
      }
      
      <input type="button" value="Post Venture" onClick={(e) => handleSubmit(e)} />
      {showUpload && <ImageUpload cloudName={cloudName} uploadPreset={uploadPreset} handleUpload={handleUpload} successUpload={() => successUpload()} />}
    </div>
  )
}

export default CommunityInput;