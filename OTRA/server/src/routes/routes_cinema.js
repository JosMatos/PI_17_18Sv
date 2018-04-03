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
const model = require('../datatypes/cinema')

/**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {cinema_repo.CinemasRepo} - The repository instance to be used
 * @return {express.Application} - The newly created application
 */
module.exports = exports = function(cinemasRepository) {
    
    const app = express()

    app.use(express.urlencoded({ extended: true }))
     
   /*
    * Lista os Cinemas configurados no Repositorio
    * 
    */
    app.get('/cinemas', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        patientsRepository.getCinemas((err, data) => {
            // TODO: Error handling
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(data))
        })
    })
    
   /*
    * Metodo responsavel por apresentar o cinema com o ID passado em memoria
    *
    */
   app.get('/cinema/:id', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        CinemaRepository.getCinema((err, data) => {
            // TODO: Error handling
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(data))
        })
    })
    
   /*
    * Metodo responsavel por Registar novo cinema com o ID passado em memoria
    *
    */
    app.post('/cinema/:id/events', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        
        /*cinemasRepository.registerCinema(new model.Event('Heartbeat', req.params.id), (err) => {
            // TODO: Error handling
        })*/
        res.end()
    })

    return app
}
