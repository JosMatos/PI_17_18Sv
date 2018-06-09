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
const reservaRoutes = require('./routes_reserva')
const userSessionRoutes = require('./routes_user_session')
const bodyParser = require('body-parser')
const sessionRoutes  = require('./routes_sessao')
const userService=require('../services/userService')

const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const hbs=require('hbs')

/**
 * Creates an express application instance and initiates it with the set of supported routes.
 * @param {repoCinema, repoFilmes} - Rrepository's to be used
 * @param {string} - The application's root directory
 * @return {express.Application} - The newly created application
 */
module.exports = exports = function(repoCinema, repoFilmes,repoSessao,repoReserva, root) {
    
    const app = express()
    const path = require('path')
    const hbs = require('hbs')
    const methodOverride = require('method-override')


  hbs.registerHelper('ifBtnF',(obj,option)=>{
    var nextbutton
    if(obj.data.currPage < obj.data.numPages)
      return nextbutton=' <button type="button"' + 'onclick='+ '"'+'window.location.href= '+"'"+'/OTRA/filmes/search?movieTitle='+obj.data.query.toString() + '&page='+obj.data.next.toString()+"'" +'"' +'>Next Page</button>'
    else
      return nextbutton= ' <button type="button"  disabled>Next Page</button>'
  })

  hbs.registerHelper('ifBtnB',(obj,option)=>{
    var prevbutton
    if(obj.data.currPage > 1)
      return prevbutton=' <button type="button"' + 'onclick='+ '"'+'window.location.href= '+"'"+'/OTRA/filmes/search?movieTitle='+obj.data.query.toString() + '&page='+obj.data.prev.toString()+"'" +'"' +'>Previous Page</button>'
    else
      return prevbutton=' <button type="button"  disabled>Previous Page</button>'

  })
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
            const user = userService.authenticate(username, password,(err,user)=>{
            return user ? done(null, user) : done(null, false);
            })
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


    app.use(cookieParser())
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
    app.use(expressSession);    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/OTRA/Reservas',reservaRoutes(repoReserva,express,signInRoutes))
    app.use('/OTRA/cinemas', cinemasRoutes(repoCinema, express,signInRoutes))
    app.use('/OTRA/filmes', filmesRoutes(repoFilmes, express,signInRoutes))
    app.use('/OTRA',userSessionRoutes)
    app.use('/OTRA/sessoes',sessionRoutes(repoSessao,express,signInRoutes))
    //app.use('/OTRA/salas', salasRoutes(repoCinema, express))
    //app.use('/OTRA/sessoes', sessoesRoutes(repoCinema, express))
    
    app.get('/OTRA', (req, res) => { 
        res.render('home.hbs', { menuState: { home: "active", signInRoutes, user: req.user } })
    })
    
    app.get('/OTRA/cinema/new.hbs', (req, res) => {
        res.render('cinemaNew.hbs', {menuState: { home: "active", signInRoutes, user: req.user } })
        })
    

        // 26_04_2018 -  Modulos de suporte para Login
    passport.serializeUser((user, done) => { done(null, user) })
    passport.deserializeUser((id, done) => { done(null, id) })


    return app
}
