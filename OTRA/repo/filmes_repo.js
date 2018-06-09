'use strict'

/**
 * Module that contains the specification of the Movies repository.
 * @module filmes_repo
 * @public
 */

module.exports.createRepository = createRepository
const http = require('request')
/**
 * Module dependencies.
 * @private
 */
const model = require('../Datatypes/OTRAObj')

/** 
 * @callback writeCallback
 * @param   {object} err - The error object, if one occurred.
 */

/** 
 * @callback readCallback
 * @param   {object} err - The error object, if one occurred.
 * @param   {object} data - The read data.
 */

/**
 * Factory function that produces a new repository instance.
 * @constructs @type FilmesRepo
 * @param   
 * @return  {FilmesRepo} The newly created repository.
 * @api public
 */
function createRepository() {

  const SESSION_MOVIES = 'http://127.0.0.1:5984/sessionmovies/'
     const filmes = new Map()

  const getFilme= (filmeid, cb) => {


    const path =SESSION_MOVIES+filmeid.toUpperCase()
    //const filme = getFilme(filmeId)
    http.get(path,{json: true}, (err,res,data) =>{

      if(data.error)
        return cb(null,data.error)
      cb( new model.MovieDetailDto(data),null)
    })
  }
/*
    

*/
    // noinspection JSAnnotator
  return {

        /**
         * Exposed for testing purposes only
         */
        __filmess__: filmes,

        /**
         * Registers the given event.
         * @param   {Event} event - The event to be registered.
         * @param   {writeCallback} cb - Completion callback.
         * @memberof CinemasRepo# 
         */
        registerEvent: (event, cb) => { addEvent(event); cb() },

        /** 
         * Gets the list of Cinemas.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */

        getFilmes: (cb) => {
            const filmeData = Array.from(filmes.keys()).map(
                (filmeId) => filmes.get(filmeId).filmesData
            )
            cb(null, filmeData)
        },

        /** 
         * Gets the Cinema with the given identifier. Calls the read callback with the cinema 
         * instance or undefined, if the cinema was not found.
         * @param   {string} cinemaId - The Cinema identifier.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */
        getFavourite:(filmeId,cb)=>{

                     const path = SESSION_MOVIES+filmeId
                     //const filme = getFilme(filmeId)
          http.get(path,{json: true}, (err,res,data) =>{

                       if(data.error)
                         return cb(null,data.error)
                      cb( data,null)
                     })  },

   /*

                               const filme = getFilme(filmeId)
                             return filme
                           },


      */


    getallsessionmovies : (cb)=>{
      let path = SESSION_MOVIES + '_all_docs'
      http.get(path, (err, res,allmovies) => {
        if (err) return cb(err)
        let moviesfull=[]
        let index =0
        allmovies=JSON.parse(allmovies)
        if (allmovies.rows.length==0)
          cb(null,moviesfull)

        allmovies.rows.forEach(obj=>
        {
          let id = obj.id
          getFilme(id,(movie,err)=>{
            if (err) return cb(err)
            if (cinema)
              moviesfull.push(movie)
            if (++index==allmovies.total_rows)
            {
              cb(null,moviesfull)
            }
          })
        })

      })

    },



        removeFavourite: (filme,cb)=>{
          const path = SESSION_MOVIES+filme.id+'?rev='+filme._rev
          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(filme)
          }
          http(path, options, (err, res, body) => {
            if(err) return cb(err)
            cb(body,null)
          })
        /*  let  addfilme= filmes.get(filmeid);
          if (addfilme) {
            filmes.delete(filmeid)
          }
          cb()*/
        },

      addFavourite : (filme,cb) => {
          const path = SESSION_MOVIES+filme.id
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(filme)
    }
    http(path, options, (err, res, body) => {
    if(err) return cb(err)
    cb(res,null)
  })
},

  /*
          let  addfilme= filmes.get(Number(filme.id));
          if (!addfilme) {
            addfilme = filme
            filmes.set(filme.id,filme)
            }

          cb()
        },
  */







      /**
         * Updates the given cinema information.
         * @param   {Cinema} cinema - The cinema information to be updated.
         * @param   {writeCallback} cb - Completion callback.
         * @memberof CinemasRepo# 
         */
        updateFilme: (filme, cb) => {
            let existingfilmes = filmes.get(Number(filme.id))

            // se não existe cinema crio a nova entidade Cinema
            if (!existingfilmes) {
                existingfilmes = {
                    filmesData: new model.MovieDetailDto(filme)

                }
            }
           /* existingfilmes.filmesData.id = cine
            existingCinema.cinemaData.cidade_localizacao= cinema.cidade_localizacao
            cinemas.set(cinema.id, existingCinema)*/
            cb()
        },




        /**
         * Gets the Max movies  present in movie Repo.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */
        getMaxId: () => {
            return filmes.size
        }
       
    }
}
