import React, { useState, Component } from "react";
import AddReviews from "./AddReview.jsx";
import { Card, CardContent, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// import { User, reviews } from '../../../../server/db/index.js'
import axios from "axios"; //remove later when routes are created

// User.findAll()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//https://emojihub.yurace.pro/api/all/category/symbols


let fakedata = [{ user: 'name', review: 'hey this is good', rating: 5 }, { user: 'test', review: 'hey this is ok', rating: 3 }, { user: 'bob', review: 'hey this is bad', rating: 0 }];
let e = parseInt('&#128507;', 16)
const Reviews = () => {
  const [thumbUp, setthumbUp] = useState()
  const [func, setfunc] = useState(() => {

    axios.get('https://emojihub.yurace.pro/api/all/group/body')
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].name === 'thumbs up sign ≊ thumbs up') {
            //  console.log((result.data[i]))
            let unicode = result.data[i].unicode[0].slice(2)
            let edit = String.fromCodePoint(parseInt(unicode, 16))
            let obj = {
              0: '',
              1: '' + edit,
              2: '' + edit + edit,
              3: '' + edit + edit + edit,
              4: '' + edit + edit + edit + edit,
              5: '' + edit + edit + edit + edit + edit,
            }
            setthumbUp(obj)
          }
        }
      })
      .catch((err) => {
        console.log('emoji error: ', err)
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
              <div>{fakedata.map((data, i) => {
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