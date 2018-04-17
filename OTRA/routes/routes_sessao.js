const fs = require('fs')
const express = require('express')
const hbs = require('hbs')
const router = express.Router()

module.exports = router

router.get('/movies/:id/sessionsadd', (req, res, next) => {
  var sessaofantasma={
    moviename :  'coisas',
    sessiondate : '2 da tarde',
    cinemanamae :"Amadora conta"
  }
  var sessaofantasma2={
    moviename : 'atas',
    sessiondate : '3 da tarde',
    cinemanamae :"Amadora conta"
  }
var sessions=[sessaofantasma,sessaofantasma2]

  res.render('movieSessions',sessions)
})
