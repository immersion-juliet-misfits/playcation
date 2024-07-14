const axios = require('axios')
const express = require('express');
let reviewsRoute = express.Router()
const {User, reviews} = require('../db/index');

reviewsRoute.use(express.json());

//get Reviews
reviewsRoute.get('/get', async (req, res)=>{
  reviews.findAll()
  .then(async (data) => {
    for(let i = 0; i < data.length; i++){
   await User.findAll({where:{
        id: data[i].dataValues.user_id
      }})
      .then((name)=>{
         data[i].dataValues.name = name[0].dataValues.username
      })
    }
    res.send(data).status(200)
  })
  .catch((err) => {
    console.error('reviewsRouter.js, ERROR can\'t get reviews: ', err)
    res.sendStatus(500)
  })
})

//get emojis body
reviewsRoute.get('/getEmoji', (req, res)=>{
  axios.get('https://emojihub.yurace.pro/api/all/group/body')
  .then((result) => {
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].name === 'thumbs up sign ≊ thumbs up') {
        let unicode = result.data[i].unicode[0].slice(2)
        let edit = String.fromCodePoint(parseInt(unicode, 16))
        let obj = {
          0:'',
          1:'' + edit,
          2:'' + edit + edit,
          3:'' + edit + edit + edit,
          4:'' + edit + edit + edit + edit,
          5:'' + edit + edit + edit + edit + edit,
        }
        res.send(obj).status(200)
      }
    }
  })
  .catch((err) => {
    console.error('reviewsRouter.js, emoji error: ', err)
    res.sendStatus(500)
  })
})
//get emojis symbols
reviewsRoute.get('/getEmoji2', (req, res)=>{
axios.get('https://emojihub.yurace.pro/api/all/category/symbols')
.then((result) => {
  let obj = {}
  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i].name === 'leftwards black arrow ≊ left arrow') {
      //  console.log((result.data[i]))
      let unicode = result.data[i].unicode[0].slice(2)
      let edit = String.fromCodePoint(parseInt(unicode, 16))
        obj[0] = edit
    }else if (result.data[i].name === 'negative squared cross mark ≊ cross mark button') {
      //  console.log((result.data[i]))
      let unicode = result.data[i].unicode[0].slice(2)
      let edit = String.fromCodePoint(parseInt(unicode, 16))
        obj[1] = edit
    }else if (result.data[i].name === 'arrow pointing rightwards then curving downwards ≊ right arrow curving down') {
      //  console.log((result.data[i]))
      let unicode = result.data[i].unicode[0].slice(2)
      let edit = String.fromCodePoint(parseInt(unicode, 16))
        obj[2] = edit
    }
  }
  res.send(obj).status(200)
})
.catch((err) => {
  console.error('reviewsRouter.js, emoji error: ', err)
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
    console.error('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

//update Reviews
reviewsRoute.patch('/patch', (req, res)=>{
  const {review, rating, id} = req.body
  reviews.update({review, rating, updatedAt: new Date()}, {where:{
    id: id
  }})
  .then((data) => {
    res.send(data).status(200)
  })
  .catch((err) => {
    console.error('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

//delete Reviews
reviewsRoute.delete('/delete/:id', (req, res)=>{
  const {id} = req.params
  reviews.destroy({where:{
    id: id,
  }})
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.error('reviewsRouter.js, ERROR can\'t post reviews: ', err)
    res.sendStatus(500)
  })
})

module.exports = reviewsRoute