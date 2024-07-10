import React, { useState, Component } from "react";
import AddReviews from "./AddReview.jsx";
import { Card, CardContent, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import axios from "axios";

const Reviews = () => {
  const [thumbUp, setthumbUp] = useState({})
  const [reviewList, setreviewList] = useState([])
  const [func, setfunc] = useState(() => {
    //emojies
    axios.get('reviews/getEmoji')
      .then(({ data }) => {
        setthumbUp(data)
      }).catch((err) => {
        console.log('Reviews.jsx, something when wrong requesting emojies: ', err)
      })
    //reviews
    axios.get('reviews/get')
      .then(({ data }) => {
        setreviewList(data)
      }).catch((err) => {
        console.log('Reviews.jsx, something when wrong requesting reviews: ', err)
      })
  })

  return (
    <>
      <span></span>
      <AddReviews />
      <Box
        sx={(theme) => ({
          width: 500,
          "& > div": {
            overflow: "hidden auto",
            "&::-webkit-scrollbar": { height: 10, WebkitAppearance: "none" },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              border: "2px solid",
              borderColor: theme.palette.mode === "dark" ? "" : "#E7EBF0",
              backgroundColor: "rgba(0 0 0 / 10)"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: 'blue',
            }
          }
        })}
      >
        <div>
          <Grid container spacing={3}>
            <Grid>
              <div>{reviewList.map((data, i) => {
                return (
                  <Card key={i} sx={{ width: 490, border: "2px solid" }}>
                    <h4>{data.user + ' gave ' + thumbUp?.[data.rating]}</h4>
                    <p>{data.review}</p>
                  </Card>

                )
              })}</div >
            </Grid>
          </Grid>
        </div>
      </Box>

    </>
  )
}

export default Reviews