import React, { useState, Component } from "react";
import { Button, Box } from '@mui/material'
import axios from "axios";

const AddReviews = ({ user, add, symbol, thumbup }) => {
  const [text, settext] = useState('')
  const [rating, setrating] = useState(0)

  function edit(name, value) {
    if (name === 'text') {
      settext(value);
    } else {
      setrating(value)
    }
  }

  const addReview = () => {
    let obj = { review: text, rating, user_id: user.id }
    console.log(obj)
    axios.post('reviews/post', obj)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log('AddReviews.jsx, something went wrong adding review to database: ', err)
      })
    obj.name = user.username
    add([obj])
  }
  return (
    <Box sx={{ border: '2px solid grey', width: '350px', top: '20px' }} >
      <Button variant="contained" onClick={() => { addReview() }}>Add review</Button>
      <input type="number" name="rating" min="0" max="5" value={rating} onChange={(e) => { edit(e.target.name, e.target.value) }}></input>
      <>{symbol + thumbup}</>
      <textarea rows="5" cols="40" name="text" onChange={(e) => { edit(e.target.name, e.target.value) }}></textarea>
    </Box>
  )
}

export default AddReviews