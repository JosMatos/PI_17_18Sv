'use strict'
module.exports={
  Cinema,
  MovieSearchDto,
  MovieDetailDto,
  CreditsDto

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
function Cinema(id, name, cidade_localizacao) {
    if (!(this instanceof Cinema)) return { id, name, cidade_localizacao }
    this.id = id
    this.name = name.toUpperCase()
    this.cidade_localizacao = cidade_localizacao.toUpperCase()
}
function MovieSearchItemDto(obj) {
  this.title = obj.title
  this.id = obj.id
  this.releaseDate = obj.release_date
  this.voteAverage = obj.vote_average
  //caso a imagem não exista colocar uma imagem 'no image'
  this.img = obj.poster_path == undefined? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'
    :'https://image.tmdb.org/t/p/w500'+ obj.poster_path
  this.toString = function (){

  }

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


