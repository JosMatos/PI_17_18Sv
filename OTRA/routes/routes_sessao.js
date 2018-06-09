const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')



module.exports = function(repoSessao, express ,signInRoutes) {

  const router = express.Router()


  router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
    res.format({
      html: () => res.render('reservas.hbs',{ menuState: { sessoes: "active", signInRoutes, user: req.user } })
    })
  })

  router.get('/sessao', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
      cinemasRepository.getallCinemas((err, cinemas)=> {
    })
  })

  return router
}