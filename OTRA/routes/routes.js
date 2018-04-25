'use strict'

/**
 * Module that contains the main set of routes.
 * @module routes
 */

/**
 * Module dependencies.
 * @private
 */
const express = require('express')
const model = require('../Datatypes/OTRAObj')

const cinemasRoutes = require('./routes_cinema')
//const filmesRoutes  = require('./routes_filme')
//const salasRoutes   = require('./routes_sala')
//const sessoesRoutes = require ('./routes_sessao')

/**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {patients_repo.PatientsRepo} - The repository instance to be used
 * @param {string} - The application's root directory
 * @return {express.Application} - The newly created application
 */
module.exports = exports = function(Repository, root) {
    
    const app = express()
    const path = require('path')
    const hbs = require('hbs')
    const methodOverride = require('method-override')

    app.set('view engine', 'hbs')
    app.set('views', path.join(root, '/views'))
    // Funções utilizadas nas views parciais
    hbs.registerHelper('equals', (theOne, theOther) => theOne === theOther)
    hbs.registerHelper('and', (theOne, theOther) => theOne && theOther)
    hbs.registerPartials(root + '/views/partials')

    app.use((req, res, next) => {
        const oldEnd = res.end
        res.end = function (...args) { 
            console.log(`Serviced ${req.method} ${req.originalUrl} with status code ${res.statusCode}`)
            return oldEnd.call(this, ...args) 
        }
        next()
    })
     
    app.use('/OTRA', express.static(path.join(root, 'static')))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use(methodOverride('_method'))

    app.use('/OTRA/cinemas', cinemasRoutes(Repository, express))
    //app.use('/OTRA/filmes', filmesRoutes(Repository, express))
    //app.use('/OTRA/salas', salasRoutes(Repository, express))
    //app.use('/OTRA/sessoes', sessoesRoutes(Repository, express))
    
    app.get('/OTRA', (req, res) => { res.render('home.hbs')})
    app.get('/OTRA/cinema/new.hbs', (req, res) => { res.render('cinemaNew.hbs')} )
    
    return app
}
