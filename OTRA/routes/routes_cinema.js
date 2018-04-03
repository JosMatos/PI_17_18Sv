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
const model = require('./datatypes/cinema')

/**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {patients_repo.PatientsRepo} - The repository instance to be used
 * @return {express.Application} - The newly created application
 */
module.exports = function(cinemasRepository) {
    
    const app = express()

    app.use(express.urlencoded({ extended: true }))
     
    app.get('/cinemas', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        patientsRepository.getCinemas((err, data) => {
            // TODO: Error handling
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(data))
        })
    })

    app.get('/cinema/status', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        patientsRepository.getCinemaStatus((err, data) => {
            // TODO: Error handling
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(data))
        })
    })

    app.post('/cinema/:id/events', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        cinemasRepository.registerEvent(new model.Event('Heartbeat', req.params.id), (err) => {
            // TODO: Error handling
        })
        res.end()
    })

    return app
}
