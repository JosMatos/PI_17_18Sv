const request = require('request')
const express = require('express')
const model = require('../Datatypes/OTRAObj')
const fs = require('fs')
const db = require('../services/AppService')



module.exports = function(repoSessao,cinemasRepository,filmeRepository, express ,signInRoutes) {

  const router = express.Router()


  router.get('/', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
    repoSessao.getallSessions((err, sessions)=> {
    cinemasRepository.getallCinemas((err, cinemas)=> {
      filmeRepository.getallsessionmovies((err, movies) => {
        res.format({
          html: () => res.render('sessao.hbs', {
            menuState: {
              sessoes: "active",
              action: "Create",
              signInRoutes,
              user: req.user
            }
          })
        })
      })
    })
    })})
  router.get('/Create', (req, res) => {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
      cinemasRepository.getallCinemas((err, cinemas)=> {
      filmeRepository.getallsessionmovies((err,movies)=>{
        res.format({
          html: () => res.render('SessaoCreate.hbs',{
            menuState: {
            sessoes: "active", signInRoutes,
              user: req.user
            },
            cinemas:cinemas,
            movies:movies })
        })

      })
    })
  })
router.post('/create', (req,res)=>{
  console.log(`Servicing ${req.method} ${req.originalUrl}`)
  const info=req.body
  const moviedata =JSON.parse(info.filmedata)
const timespan=[
 time=info.startime,
  day=info.day,
  month=info.month,
  year=info.year
]
  const sessao = new model.Session(moviedata.movieid,moviedata.originalTitle,moviedata.img,info.cinemaid,info.idsala,timespan)
    repoSessao.insertSession( sessao ,(data,err)=>{
  if (err) throw err
  res.redirect(303, `/OTRA/sessoes`)
})
})


  return router
}