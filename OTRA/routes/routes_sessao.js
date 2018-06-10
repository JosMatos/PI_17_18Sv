const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')



module.exports = function(repoSessao,cinemasRepository,filmeRepository, express ,signInRoutes) {

  const router = express.Router()


  router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
    res.format({
      html: () => res.render('sessao.hbs',{ menuState: { sessoes: "active", 
                                                         action : "Create",
                                                         signInRoutes, 
                                                         user: req.user } })
    })
  })

  router.get('/Create', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
      cinemasRepository.getallCinemas((err, cinemas)=> {
      filmeRepository.getallsessionmovies((err,movies)=>{
        res.format({
          html: () => res.render('SessaoCreate.hbs',{
            menuState: {
            sessoes: "active", signInRoutes,
              user: req.user
            },
            cinemas:cinemas,
            movies:movies })
        })

      })
    })
  })

  return router
}