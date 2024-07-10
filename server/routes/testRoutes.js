const express = require('express')
const axios = require('axios')
const {User, reviews} = require('../db/index')

let router = express.Router()
// User.findAll()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

router.get('/test', (req, res)=>{
  res.send({mssg: 'it worked'})
})

module.exports = router