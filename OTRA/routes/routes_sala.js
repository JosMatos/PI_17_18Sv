

/**
 * Module that contains the set of routes pertaining to patient information.
 * @module routes_sala
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

/**
 * Creates an express.Router instance and initiates it with the set of supported routes.
 * @param {sala_repo.SalaRepo} salaRepository - The repository instance to be used
 * @param {express.Application} express - The express application instance
 * @return {express.Router} - The newly created instance
 */
module.exports = exports = function(salaRepository , express) {
    
    const router = express.Router()

    router.get('/', (req, res) => {
        salaRepository.getSala((err, data) => {
            if (err) throw err
            res.format({
                html: () => res.render('sala.hbs', { sala: data }),
                json: () => res.json(data)
            })
        })
    })

    router.post('/', (req, res) => {
        const info = req.body
        if (!info || !info.salaId || Number.isNaN(Number(info.cinema)))
            return res.sendStatus(400)

        const sala = new model.Sala(info.salaId, Number(info.cinema), info.description)
        salaRepository.updatePatient(sala, (err) => {
            if (err) throw err
            res.redirect(303, `${req.originalUrl}/${info.salaId}`)
        })
    })

    router.get('/:id', (req, res, next) => {
        salaRepository.getSala(req.params.id, (err, data) => {
            if (err) throw err
            if (!data) next()
            else {
                
                res.format({
                    html: () => res.render('sala.hbs', {
                        actionUrl: `/OTRA/sala/${data.id}?_method=PUT`,
                        salaInfo: data 
                    }),
                    json: () => res.json(data)
                })
            }
        })
    })

    router.put('/:id', (req, res, next) => {

        const salaInfo = req.body
        if (!salaInfo || Number.isNaN(Number(salaInfo.cinema)))
            return res.sendStatus(400)

        const updateSala = function(redirectUrl) {
            const sala = new model.Sala(req.params.id, Number(SalaInfo.cinema), SalaInfo.name)
            salaRepository.updateSala(sala, (err) => {
                if (err) throw err
                if (redirectUrl) res.redirect(303, `${req.originalUrl}`)
                else res.end()
            })
        }

        if (req.originalMethod === 'POST') {
            salaRepository.getSala(req.params.id, (err, data) => {
                if (err) throw err
                if (!data) next()
                else updateSala(`${req.originalUrl}`)
            })
        } else {
            updateSala()
        }
    })

    return router
}





    
