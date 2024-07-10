const axios = require('axios')
const express = require('express');
let reviewsRoute = express.Router()
const {User, reviews} = require('../db/index');

reviewsRoute.use(express.json());

//get Reviews
reviewsRoute.get('/get', (req, res)=>{
  reviews.findAll()
  .then((data) => {
    res.send(data).status(200)
  })
  .catch((err) => {
    console.log('reviewsRouter.js, ERROR can\'t get reviews: ', err)
    res.sendStatus(500)
  })
})
//get emojies
reviewsRoute.get('/getEmoji', (req, res)=>{
  //https://emojihub.yurace.pro/api/all/category/symbols
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
        res.send(obj).status(200)
      }
    }
  })
  .catch((err) => {
    console.log('reviewsRouter.js, emoji error: ', err)
    res.sendStatus(500)
  })
})

//post Reviews
reviewsRoute.post('/post', (req, res)=>{
  const {review, rating, user_id} = req.body
  reviews.create({review, rating, user_id})
  .then((data) => {
    res.send(data).status(201)
  })
  .catch((err) => {
    console.log('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

//update Reviews
reviewsRoute.patch('/patch', (req, res)=>{
  const {review, rating, user_id, id} = req.body
  reviews.update({review, rating, updatedAt: new Date()}, {where:{
    id: id,
    user_id: user_id
  }})
  .then((data) => {
    res.send(data).status(200)
  })
  .catch((err) => {
    console.log('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

//delete Reviews
reviewsRoute.delete('/delete', (req, res)=>{
  const { user_id, id} = req.body
  reviews.destroy({where:{
    id: id,
    user_id: user_id
  }})
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

module.exports = reviewsRoute