import React, { useState, Component } from "react";
import { Button, Box } from '@mui/material'

const AddReviews = () => {
  const [text, settext] = useState('')
  const [rating, setrating] = useState(0)
  const [user, setuser] = useState(null)

  function edit(name, value) {
    if (name === 'text') {
      settext(value);
      console.log("text: " + value + " rating: ", + rating)
    } else {
      setrating(value)
      console.log("text: " + text + " rating: ", + value)
    }
  }

  return (
    <Box sx={{ border: '2px solid grey', width: '350px' }} >
      <Button variant="contained" onClick={() => { console.log("text: " + text + " rating: ", + rating + " click") }}>Add review</Button>
      <input type="number" name="rating" min="0" max="5" value={rating} onChange={(e) => { edit(e.target.name, e.target.value) }}></input>
      <textarea rows="5" cols="40" name="text" onChange={(e) => { edit(e.target.name, e.target.value) }}></textarea>
    </Box>
  )
}

export default AddReviews