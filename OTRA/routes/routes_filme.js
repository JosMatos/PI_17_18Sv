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


module.exports = function(filmesRepository, express ,signInRoutes) {

  const router = express.Router()


 router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
        res.format({
            html: () => res.render('filmesSearch.hbs',{ menuState: { home: "active", signInRoutes, user: req.user } })
        })
  })

  router.post('/movies/:movieId', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)

    const info = req.body.movieId

  if (req.body.toadd=="false") {
    filmesRepository.removeFavourite(info, (err) => {
     if (err) throw err

     res.redirect(303, `${req.originalUrl}`)

    })
  }else {
    db.movieIDQuery(req.body.movieId, (err, data) => {
      if (err) return next(err)
      data.id = req.params.movieId;

      // Validar a informação recebida, se vem toda

      if (!info)
        return res.sendStatus(400)

      //const new_filme = model.

      filmesRepository.addFavourite(data, (data, err) => {
        if (err) throw err

        res.redirect(303, `${req.originalUrl}`)

      })
    })
  }
  })


  /*
Integração Tiago  - 2018_04_22
  */
  router.post('/search', (req, res, next) => {
    if(req.query.page == undefined)
      req.query.page = 1
    db.movieNameQuery(req.body.movieTitle,req.query.page,(err, data) => {
      if(err) return next(err)
      res.render('searchView', { menuState: { home: "active", signInRoutes, user: req.user },
        data :data})
    })
  })
/**/
router.put('/movies/:movieId',(req,res)=>{
   const info = req.body.movieId
     filmesRepository.removeFavourite(info, (err) => {
    if (err) throw err

       res.redirect(303, `${req.originalUrl}`)



     })
  })
router.get('/movies/:movieId', (req, resp, next) => {
  db.movieIDQuery(req.params.movieId, (err, data) => {
    if(err) return next(err)
  data.id=req.params.movieId;
    if(filmesRepository.getFilme(data.id))
      data.isfav=true;
    else
      data.isfav=false;
    // const msg = req.flash('inputError')
  //  if(msg)  d.inputError = {message: msg}
    resp.render('movieView',
      { menuState: { home: "active", signInRoutes, user: req.user },
      data :data})
  })
})



return router
}