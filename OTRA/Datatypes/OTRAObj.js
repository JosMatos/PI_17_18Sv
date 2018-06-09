'use strict'
module.exports={
  Cinema,
  MovieSearchDto,
  MovieDetailDto,
  CreditsDto,
  Sala

}



/*
module.exports.Sala   = Sala
module.exports.Sessao = Sessao
*/
/**
 * Module that contains the specification of the existing data types.
 * @module datatypes
 * @public
 */

/**
 * Constructor function that initializes a new Cinema instance with the given arguments.
 * @param       {string} id - The cinema identifier.
 * @param       {string} name - The Cinema name.
 * @param       {string} cidade_localizacao - The city where the cinema is located.
 * @class
 * @classdesc Data type that represents cinemas.
 * @api public
 */
function Cinema(id, name, cidade_localizacao, nrsalas,salas) {
    if (!(this instanceof Cinema)) return { id, name, cidade_localizacao ,nrsalas}
    this.id = id
    this.name = name
    this.cidade_localizacao = cidade_localizacao
  if (salas==undefined){
    this.salas =[]
    for (var i = 0; i < i.nrsalas; i++) {
      this.salas.push (new Sala(i,i,30,30,[]))
    }
  }
    else this.salas=salas
    this.nrsalas=nrsalas


}
function MovieSearchItemDto(obj) {
  this.title = obj.title
  this.id = obj.id
  this.releaseDate = obj.release_date
  this.voteAverage = obj.vote_average
  //caso a imagem não exista colocar uma imagem 'no image'
  this.img = obj.poster_path == undefined? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'
    :'https://image.tmdb.org/t/p/w500'+ obj.poster_path
  this.isfav
  this.toString = function (){

  }

}
function Session (moviename,movieid,cinemaname,idsala,timespan) {
  this.id=moviename+cinemaname+idsala
  this.moviename=moviename
  this.movieId=movieid
  this.cinemaname=cinemaname,
    this.id_sala=idsala
  this.ttimespan=[]
    timespan.forEach((element)=> {
      timespan.push(new sessiontimespane(element))
    })

}

function Sala(id_sala, nome_sala, nr_filas, nr_lugar_fila,isocupied) {

  this.id_sala = id_sala
  this.nome_sala = nome_sala.toUpperCase()
  this.nr_filas = nr_filas
  this.nr_lugar_fila = nr_lugar_fila
  this.isocupied=isocupied
}

function  sessiontimespane(obj) {
  this.date=date
  this.starttime=starttime
  this.endtime=endtime
}
function MovieSearchDto(obj) {
  this.results = []
  this.currPage = obj.page
  this.prev = (this.currPage - 1);
  this.next = (this.currPage + 1);
  this.numPages = obj.total_pages
  var result = obj.results
  if(result!=undefined){
    result.forEach(element => {
      this.results.push(new MovieSearchItemDto(element))
    })
  }


}

function MovieDetailDto(obj) {
  this.tagline = obj.tagline
  this.id = obj.id
  this.originalTitle = obj.body.original_title
  this.overView = obj.body.overview
  this.releaseDate = obj.body.release_date
  this.voteAverage = obj.body.vote_average
  this.img = 'https://image.tmdb.org/t/p/w500' + obj.body.poster_path
  this.toString = function () {
  }
  this.title=this.originalTitle
}

function CreditsDto(obj) {
  this.cast = []
  var result = obj.body.cast
  result.forEach(element => {

    this.cast.push(new CastItemDbo(element))
  })
  this.toString = function () {
  }
}

function CastItemDbo(obj) {
  this.name = obj.name.toString()
  this.id = obj.id.toString()
  this.character = obj.character.toString()
  this.toString = function () {
  }
}
function reserva (obj) {
  this.id = obj.id.toString()
  this.sessionID=obj.sessionID.toString()
  this.toString = function(){

  }
}


