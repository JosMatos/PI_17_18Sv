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
module.exports = function(cinemasRepository, express,signInRoutes) {
    
    const router = express.Router()

    router.get('/', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        cinemasRepository.getallCinemas((err, data)=> {
            if (err) throw err
            res.format({
                html: () => res.render('cinemas.hbs', {
                    menuState: { cinema: "active", signInRoutes, user: req.user },
                  cinemas: data
                }),
                json: () => res.json(data)
            })
           
        }
        )
    })

    router.post('/', (req, res) => {
        console.log(`Servicing ${req.method} ${req.originalUrl}`)
        
        const info = req.body
        
        
        // Se for para Remover um Cinema !!!
        if ( typeof info.rem_id_cinema !== 'undefined' && info.rem_id_cinema
           && typeof info.rem_rev_cinema !== 'undefined' && info.rem_rev_cinema )
           {
                cinemasRepository.removeCinema(info.rem_id_cinema, info.rem_rev_cinema, (msg,err) => {
                    if (err) throw err
                    res.redirect(303, `${req.originalUrl}`)
                })
            }
        
        else
        {
            // Validar a informação recebida, se vem toda
            if (!info || !info.name || !info.cidade_localizacao || !info.nrsalas)
                return res.sendStatus(400)

            if (!info.id) {
              info.id = info.name + '_' + info.cidade_localizacao;
              info.id = info.id.split(' ').join('_')
            }
            const new_cinema = new model.Cinema( info.id , info.name, info.cidade_localizacao,info.nrsalas)
        
            cinemasRepository.updateCinema(new_cinema, (msg,err) => {
                if (err) throw err
                res.redirect(303, `${req.originalUrl}/${info.id}`)
            })
        }

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
        let id=req.params.id
        cinemasRepository.getCinema(id,(data,err) => {
            if (err) throw err
            res.format({
              html: () => res.render('cinema.hbs', {
                menuState: { cinema: "active", signInRoutes, user: req.user },
                cinemaInfo: data }),
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
