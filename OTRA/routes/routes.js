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
const filmesRoutes  = require('./routes_filme')
//const salasRoutes   = require('./routes_sala')
//const sessoesRoutes = require ('./routes_sessao')


const userSessionRoutes = require('./routes_user_session')

/**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {repoCinema, repoFilmes} - Rrepository's to be used
 * @param {string} - The application's root directory
 * @return {express.Application} - The newly created application
 */
module.exports = exports = function(repoCinema, repoFilmes, root) {
    
    const app = express()
    const path = require('path')
    const hbs = require('hbs')
    const methodOverride = require('method-override')


    
    // 26_04_2018 -  Modulos de suporte para Login
    const signInRoutes = {
        login: '/OTRA/login',
        logout: '/OTRA/logout'
    }
    const expressSession = require('express-session')({ secret: 'its a secret', resave: true, saveUninitialized: true })
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy

    passport.use(new LocalStrategy(
        function(username, password, done) {
            const user = usersRepository.verifyCredentials(username, password)
            return user ? done(null, user) : done(null, false);
        }
    ))

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


    // 26_04_2018 -  Modulos de suporte para Login
    app.use(expressSession);
    app.use(passport.initialize())
    app.use(passport.session())   


    app.use('/OTRA/cinemas', cinemasRoutes(repoCinema, express))
    app.use('/OTRA/filmes', filmesRoutes(repoFilmes, express))
    //app.use('/OTRA/salas', salasRoutes(repoCinema, express))
    //app.use('/OTRA/sessoes', sessoesRoutes(repoCinema, express))
    
    app.get('/OTRA', (req, res) => { 
        res.render('home.hbs', { menuState: { home: "active", signInRoutes, user: req.user } })
    })
    
    app.get('/OTRA/cinema/new.hbs', (req, res) => { res.render('cinemaNew.hbs')} )
    

        // 26_04_2018 -  Modulos de suporte para Login
    passport.serializeUser((user, done) => { done(null, user) })
    passport.deserializeUser((id, done) => { done(null, id) })


    return app
}