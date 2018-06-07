const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')



module.exports = function(repoReserva, express ,signInRoutes) {

  const router = express.Router()


  router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
    res.format({
      html: () => res.render('reservas.hbs',{ menuState: { reserva: "active", signInRoutes, user: req.user } })
    })
  })

return router
}