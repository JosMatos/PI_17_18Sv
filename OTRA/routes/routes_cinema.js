'use strict'

/**
 * Module that contains the main set of cinema routes.
 * @module routes
 */

/**
 * Module dependencies.
 * @private
 */
const express = require('express')
const model = require('../Datatypes/OTRAObj')

 /**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {cinemas_repo.CinemasRepo} - The repository instance to be used
 * @return {express.Application} - The newly created application
 */
module.exports = function(cinemasRepository, express) {
    
    const router = express.Router()

    router.get('/', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        cinemasRepository.getCinemas((err, data) => {
            if (err) throw err
            res.format({
                html: () => res.render('cinemas.hbs', { cinemas: data }),
                json: () => res.json(data)
            })
           
        })
    })

    router.post('/', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        
        const info = req.body
        // Validar a informação recebida, se vem toda
        if (!info || !info.name || !info.cidade_localizacao)
            return res.sendStatus(400)

        if (!info.id)
            info.id = cinemasRepository.getMaxId() + 1 ;

        const new_cinema = new model.Cinema( info.id , info.name, info.cidade_localizacao)
      
        cinemasRepository.updateCinema(new_cinema, (err) => {
            if (err) throw err
            res.redirect(303, `${req.originalUrl}/${info.id}`)
        })
    })


    // Retornas as Salas do Cinema id
    router.get('/:id/salas', (req, res, next ) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        cinemasRepository.getCinemaSalas(req.params.id,(err, data) => {
            if (err) throw err
            res.format({
                html: () => res.render('cinema_salas.hbs', { patientsStatus: data }),
                json: () => res.json(data)
            })

        })
    })
 
    // Retorna info do cinema com o id, passado o Id do cinema...
    router.get('/:id', (req, res, next ) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        cinemasRepository.getCinema(req.params.id,(err, data) => {
            if (err) throw err
            res.format({
              html: () => res.render('cinema.hbs', {cinemaInfo: data }),
              json: () => res.json(data)
            })
        })
    })

    // Redirect para a pagina principal...
    router.post('/:id', (req, res, next ) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        res.redirect(303, `${req.baseUrl}`)
      
        

    // Afecta a Sala passada por parametro ao Cinema com o Id passado    


    })
  
    return router
}
