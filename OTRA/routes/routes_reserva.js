const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')

module.exports = function(cinemasRepository, sessaoRepository, filmeRepository, repoReserva, express ,signInRoutes) {

  const router = express.Router()

  router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)    
    
    cinemasRepository.getallCinemas((err, cinemas)=> {
      filmeRepository.getallsessionmovies((err,movies)=>{
        res.format({
          html: () => res.render('ReservasCreate.hbs',{
                            menuState: { reserva: "active", signInRoutes, user: req.user },
                            cinemas: cinemas,
                            movies_in_theater : movies,
                            sessoes: sessions,
                            lugar_livres: lugares
                          })
                    })
                  })
                })
              })
            
            


              return router
            }