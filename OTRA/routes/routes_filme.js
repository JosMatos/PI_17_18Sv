'use strict'

/**
 * Module that contains the main set of Movie routes.
 * @module routes
 */

 /**
 * Module dependencies.
 * @private
 */

const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')


module.exports = function(filmesRepository, express) {

  const router = express.Router()


 router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
        res.format({
            html: () => res.render('filmesSearch.hbs', {layout : false})
        })
  })

  router.post('/addfavourite', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)

    const info = req.body.movieId
    // Validar a informação recebida, se vem toda

    if (!info )
      return res.sendStatus(400)



    const new_filme = filmesRepository.getfilme(info)

    filmesRepository.updateFilme(new_filme, (err) => {
      if (err) throw err
      res.redirect(303, `${req.originalUrl}/${info.id}`)
    })
  })
  /*
Integração Tiago  - 2018_04_22
  */
  router.post('/search', (req, res, next) => {
    if(req.query.page == undefined)
      req.query.page = 1
    db.movieNameQuery(req.body.movieTitle,req.query.page,(err, data) => {
      if(err) return next(err)
      res.render('searchView', data)
    })
  })
/**/

router.get('/movies/:movieId', (req, resp, next) => {
  db.movieIDQuery(req.params.movieId, (err, d) => {
    if(err) return next(err)
  d.id=req.params.movieId;
    // const msg = req.flash('inputError')
  //  if(msg)  d.inputError = {message: msg}
    resp.render('movieView', d)
  })
})



return router
}