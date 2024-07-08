import React, { useState, Component } from "react";
import AddReviews from "./AddReview.jsx";

let fakedata = [{ user: 'name', review: 'hey this is good', rating: 5 }, { user: 'test', review: 'hey this is ok', rating: 3 }, { user: 'bob', review: 'hey this is bad', rating: 0 }];

const Reviews = () => {
  return (
    <>
      this is the review
      <AddReviews />
      <div>{fakedata.map((data, i) => {
        return (
          <div key={i}>
            <h3>{data.user}</h3>
            <div>{data.rating}</div>
            <p>{data.review}</p>
          </div>
        )
      })}</div>
    </>
  )
}

export default Reviews