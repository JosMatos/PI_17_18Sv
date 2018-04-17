'use strict'
const MovieObj = require('./../Datatypes/MovieObj')
const api_key = '87469992e9a644f184ee96f69c303569'
const http=require('request')
const fs= require('fs')
const  url = require('url')
module.exports = {
  movieNameQuery,
  movieIDQuery
}
const configFilePath='C:\\Users\\Tiago\\Desktop\\Faculdade\\PI_Verao\\PI_17_18Sv\\OTRA\\movies.json'

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
}
  function movieIDQuery(id,cb) {


      var path = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
      http.get(path,{json: true}, (err, res) =>{
        if(err) return cb(err)
        var path2=`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`
        http.get(path2,{json: true},(err2,res2)=>{
          var movie= new MovieObj.MovieDetailDto(res)
          if(err2)
            movie.cast=null;
          else
            movie.cast=new MovieObj.CreditsDto(res2)

          cb(null,movie)
        });
      });
    }





function postSessionPlace (Movie) {
  if (!configFilePath || !fs.existsSync(configFilePath)) {
    console.error(`Could not find file ${configFilePath}`)
    console.error('Usage: node app <configFilePath>')
    return
  }
  console.log(JSON.parse(Movie.toString()))
  console.log('///////////////////////////////////////////////////////////////////////////')
  console.log(Movie.toString())
  fs.writeFile(configFilePath, (err,data )=>{

    if(err) {
      console.error(`Could not read from file ${configFilePath}`)
      return
    }

    JSON.parse(data.toString())
  })
}

function  setMovieSession (session) {


}
