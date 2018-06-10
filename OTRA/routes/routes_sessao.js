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
       const orderbycinema=[]
        cinemas.forEach(cinema=>{
         orderbycinema.push( new model.CinemasessionView(cinema.name+'-'+cinema.cidade_localizacao, sessions.filter(c=>c.cinemaid==cinema.id)))

        })

        res.format({
          html: () => res.render('sessao.hbs', {
            menuState: {
              sessoes: "active",
              action: "Create",
              signInRoutes,
              user: req.user },
              sessions: orderbycinema

            })
          })
        })
      })
    })
  })



  router.post('/remove',(req, res)=> {
    console.log(`Servicing ${req.method} ${req.originalUrl}`)
    const info = req.body
    repoSessao.removeSessao(info.rem_id_sessao, info.rem_rev_sessao, (msg, err) => {
      if (err) throw err
      res.redirect(303, `/OTRA/Sessoes`)

    })
  }
  )





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
const date=info.day+'-' +info.month+'-'+info.year

  const sessao = new model.Session(moviedata.movieid,moviedata.originalTitle,moviedata.img,info.cinemaid,info.idsala,date,info.startime)
    repoSessao.insertSession( sessao ,(data,err)=>{
  if (err) throw err
  res.redirect(303, `/OTRA/sessoes`)
})
})


  return router
}