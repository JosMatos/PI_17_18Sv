const express = require('express')
const fs = require('fs')
const router = express.Router()
module.exports = router
const db = require('../services/AppService')

router.get('/search', (req, res, next) => {

  if(req.query.page == undefined)
    req.query.page = 1
  db.movieNameQuery(req.query.q,req.query.page,(err, data) => {
    if(err) return next(err)
    res.render('searchView', data)
  })
})
router.get('/movies/:movieId', (req, res, next) => {
  db.movieIDQuery(req.params.movieId, (err, d) => {
    if(err) return next(err)
  // const msg = req.flash('inputError')
  //  if(msg)  d.inputError = {message: msg}
    res.render('movieView', d)
  })
})