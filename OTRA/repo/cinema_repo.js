'use strict'

/**
 * Module that contains the specification of the cinema repository.
 * @module cinemas_repo
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
 * @constructs @type CinemaRepo
 * @param   
 * @return  {CinemasRepo} The newly created repository.
 * @api public
 */
function createRepository() {
     const cinemas = new Map()
     const salas = new Map()
     const sessoes = new Map()
  const cinemasdb = 'http://127.0.0.1:5984/cinemas/'
    
   /*  const getCinema = (cinemaId) => {
        const cinema = cinemas.get(cinemaId)
        if (!cinema)
            return new model.Cinema(cinemaId, 'UNKNOWN', 'UNKNOW')
        return  cinema;   
        }*/
   const getCinema= (cinemaid, cb) => {


    const path = cinemasdb+cinemaid.toString().toUpperCase()
    //const filme = getFilme(filmeId)
    http.get(path,{json: true}, (err,res,data) =>{

      if(data.error)
        return cb(null,data.error)
      cb( data,null)
    })
  }

     return {

        /**
         * Exposed for testing purposes only
         */
        __cinemas__: cinemas,

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
        getCinemas: (cb) => {
            const cinemasData = Array.from(cinemas.keys()).map(
                (cinemaId) => cinemas.get(cinemaId).cinemaData
            )
            cb(null, cinemasData)
        },

        /** 
         * Gets the Cinema with the given identifier. Calls the read callback with the cinema 
         * instance or undefined, if the cinema was not found.
         * @param   {string} cinemaId - The Cinema identifier.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */
        getCinema: (cinemaid, cb) => {



            const path = cinemasdb+cinemaid
            //const filme = getFilme(filmeId)
            http.get(path,{json: true}, (err,res,data) =>{

              if(data.error)
                return cb(null,data.error)
              cb( data,null)
            })
        },


           /* const cinema = getCinema(Number(cinemaId))
            cb(null, cinema ? cinema.cinemaData : cinema)
        },
       getSalas: (cb) => {
         const salasData = Array.from(salas.keys()).map(
           (salaId) => salas.get(salaId).salasData
         )
         cb(null, salasData)
       },*/
        /**
         * Updates the given cinema information.
         * @param   {Cinema} cinema - The cinema information to be updated.
         * @param   {writeCallback} cb - Completion callback.
         * @memberof CinemasRepo# 
         */
        updateCinema: (cinema, cb) => {

          const path =cinemasdb+cinema.name+'_'+cinema.cidade_localizacao
          const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(cinema)
          }
          http(path, options, (err, res, body) => {
            if(err) return cb(err)
            cb(res,null)
          })

        },


       removeCinema: (cinemaid,cb)=> {

         const path = cinemasdb + cinema.name + '?id=' +cinemaid
         const options = {
           method: "DELETE",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(cinema)
         }
         http(path, options, (err, res, body) => {
           if (err) return cb(err)
           cb(body, null)
         })
       },
       getallCinemas : (cb)=>{
         let path = cinemasdb + '_all_docs'
         http.get(path, (err, res,allcinemas) => {
           if (err) return cb(err)
          let cinemasfull=[]
         let index =0
          allcinemas=JSON.parse(allcinemas)
          allcinemas.rows.forEach(obj=>{
            let id =obj.id
            getCinema(id,(cinema,err)=>{
              if (err) return cb(err)
              if(cinema)
                cinemasfull.push(cinema)
              if (++index==allcinemas.total_rows){
                cb(null,cinemasfull)
              }
            })
          })

         })

       },


          /*  let existingCinema = cinemas.get(Number(cinema.id))
            
            // se não existe cinema crio a nova entidade Cinema
            if (!existingCinema) {
                existingCinema = {
                    cinemaData: new model.Cinema(cinema.id, cinema.name, cinema.cidade_localizacao,cinema.nrsalas),
                    salas: new Map()
                }
            }
            existingCinema.cinemaData.name = cinema.name
            existingCinema.cinemaData.cidade_localizacao= cinema.cidade_localizacao
            cinemas.set(cinema.id, existingCinema)
            cb()*/


        /** 
         * Gets the list of Movie Room from Cinema.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */

         getCinemaSalas: (cinemaId, cb) => { 
            const cinemaSalas = Array.from(cinemas.keys()).map((cinemaId) => getSalas(cinemaId))
            cb(null, cinemaSalas)
        },


       updateSala: (id_cinema, sala, cb) => {
         let existingCinema = cinemas.get(Number(id_cinema))
         if (!existingCinema) { return }

         let existingSala = existingCinema.salas.get(sala.id_sala);

         // se não existe cinema crio a nova entidade Cinema
         if (!existingSala) {
           existingSala = {
             salaData: new model.Sala(sala.id_sala, sala.nome_sala, sala.nr_filas, sala.nr_lugar_fila)
           }
         }

         existingSala.salaData.nome_sala = sala.nome_sala
         existingSala.salaData.nr_filas =  sala.nr_filas
         existingSala.salaData.nr_lugar_fila = sala.nr_lugar_fila
         existingCinema.salas.set(sala.id_sala,existingSala.salaData);
         cb()
       },
        /**
         * Gets the Max Cinema ID present in Cinema Repo.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */
       /* getMaxId: () => {
            return cinemas.size
        }*/

       
    }
}
