import React, { useState, Component } from "react";
import AddReviews from "./AddReview.jsx";
import { Card, CardContent, Box, Fab } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from "axios";
import UpdateReview from './UpdataReview.jsx'

const Reviews = ({ user }) => {
  const [thumbUp, setthumbUp] = useState({})
  const [symbols, setsymbols] = useState({})
  const [reviewList, setreviewList] = useState([])
  const [show, setshow] = useState(false)
  const [currentReview, setcurrentReview] = useState({})
  const [currentRow, setcurrentRow] = useState({})
  const [func, setfunc] = useState(() => {
    //emojis body
    axios.get('reviews/getEmoji')
      .then(({ data }) => {
        setthumbUp(data)
      }).catch((err) => {
        console.log('Reviews.jsx, something went wrong requesting emojies: ', err)
      })
    //emojis symbols
    axios.get('reviews/getEmoji2')
      .then(({ data }) => {
        setsymbols(data)
      }).catch((err) => {
        console.log('Reviews.jsx, something went wrong requesting emojies: ', err)
      })
    //reviews
    axios.get('reviews/get')
      .then(({ data }) => {
        setreviewList(data)
      }).catch((err) => {
        console.log('Reviews.jsx, something went wrong requesting reviews: ', err)
      })

  })

  let changeShow = (current, row) => {
    setshow(!show);
    setcurrentReview(current);
    setcurrentRow(row)
  }

  let add = (data) => { setreviewList(data.concat(reviewList)) }

  let update = (data, row) => {
    let arr = reviewList.concat([])
    arr[row] = data
    setreviewList(arr)
  }

  let deleteReview = (id) => {
    let url = 'reviews/delete/' + id;
    axios.delete(url, { reviewid: id })
      .then(() => {
        let arr = []
        for (let i = 0; i < reviewList.length; i++) {
          if (reviewList[i].id !== id) {
            arr.push(reviewList[i])
          }
        }
        setreviewList(arr)
      })
      .catch((err) => {
        console.log('Reviews.jsx, something went wrong deleting review: ', err)
      })
  }

  return (
    <>
      {show === false && <AddReviews user={user} add={add} symbol={symbols?.[0]} thumbup={thumbUp?.[1]} />}
      {show === true && <UpdateReview user={user} symbol={symbols?.[0]} thumbup={thumbUp?.[1]} update={update} currentReview={currentReview} changeShow={changeShow} currentRow={currentRow} />}
      <Box
        sx={(theme) => ({
          width: 500,
          "& > div": {
            height: 510,
            overflow: "hidden scroll",
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
                    {user.id === data.user_id && <>
                      <Fab sx={{ height: '10px', width: '35px' }} onClick={() => { deleteReview(data.id) }}><DeleteIcon /></Fab>
                      <Fab sx={{ height: '10px', width: '35px' }} onClick={() => { changeShow(data, i) }}>{symbols?.[2]}</Fab>
                    </>
                    }
                    <h4>{data.name + ' gave ' + thumbUp?.[data.rating]}</h4>
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