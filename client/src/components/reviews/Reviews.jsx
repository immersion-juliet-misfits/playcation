import React, { useState, Component } from "react";
import AddReviews from "./AddReview.jsx";
import { Card, CardContent } from '@mui/material'

let fakedata = [{ user: 'name', review: 'hey this is good', rating: 5 }, { user: 'test', review: 'hey this is ok', rating: 3 }, { user: 'bob', review: 'hey this is bad', rating: 0 }];
let e = parseInt('&#128507;', 16)
const Reviews = () => {
  return (
    <>
      this is the review
      <AddReviews />

      <div>{fakedata.map((data, i) => {
        return (
          <Card key={i}>
            <h3>{data.user + " gave " + data.rating}</h3>
            <p>{data.review}</p>
          </Card>
        )
      })}</div >
    </>
  )
}

export default Reviews