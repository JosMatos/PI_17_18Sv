const express = require('express')
const fs = require('fs')
const router = express.Router()
module.exports = router
const db = require('../services/AppService')
const fs =
router.get('/search', (req, resp, next) => {

  if(req.query.page == undefined)
    req.query.page = 1
  db.movieNameQuery(req.query.q,req.query.page,(err, data) => {
    if(err) return next(err)
    resp.render('searchView', data)
  })
})