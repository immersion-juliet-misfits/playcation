import React, { useState } from "react";
import { Button, Box } from '@mui/material'
import axios from "axios";

const UpdateReview = ({ user, currentReview, update, changeShow, currentRow, symbol, thumbup }) => {
  const [text, settext] = useState('')
  const [rating, setrating] = useState(0)

  function edit(name, value) {
    if (name === 'text') {
      settext(value);
    } else {
      setrating(value)
    }
  }
  let updateRequest = () => {
    axios.patch('reviews/patch', { review: text, rating, id: currentReview.id })
      .then(() => {
        update({ review: text, rating, id: currentReview.id, createdAt: currentReview.createdAt, user_id: currentReview.user_id, name: user.username }, currentRow)
        changeShow()
      })
      .catch((err) => {
        console.error('Reviews.jsx, something went wrong updateing reviews: ', err)
      })
  }

  return (
    <Box sx={{ border: '2px solid grey', width: '350px' }} >
      <Button variant="contained" onClick={() => { updateRequest() }}>Update review</Button>
      <input type="number" name="rating" min="0" max="5" value={rating} onChange={(e) => { edit(e.target.name, e.target.value) }}></input>
      <>{symbol + thumbup}</>
      <textarea rows="5" cols="40" name="text" onChange={(e) => { edit(e.target.name, e.target.value) }}></textarea>
    </Box>
  )
}

export default UpdateReview