'use strict'
const MovieObj = require('./../Datatypes/MovieObj')
const api_key = '87469992e9a644f184ee96f69c303569'
const http=require('request')
const fs= require('fs')
const  url = require('url')
module.exports = {
  movieNameQuery
}
const filepath='batatas'

function movieNameQuery(name,page,cb) {
  var nm = name.toString()+page.toString()

    const path = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name.replace(" ","%20")}&page=${page}`
   // request(path,(err, res) => {
     http.get(path,{json: true},  (err,res,data)=>{

      if(err) return cb(err)
      var movieResult = new MovieObj.MovieSearchDto(data)
      movieResult.query= name.toString()
    movieResult.title=name

    cb(null,movieResult )
  })
function getSessionPlace (moviename) {
    if (!configFilePath || !fs.existsSync(configFilePath)) {
      console.error(`Could not find file ${configFilePath}`)
      console.error('Usage: node app <configFilePath>')
      return
    }

    fs.readFile(configFilePath, (err, data) => {
      if(err) {
        console.error(`Could not read from file ${configFilePath}`)
        return
      }

      startPatients(JSON.parse(data.toString()))
    })
  }

  function  setMovieSession (session) {


  }
}


}

