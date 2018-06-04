'use strict'

/**
 * Module that contains the specification of the Movies repository.
 * @module filmes_repo
 * @public
 */

module.exports.createRepository = createRepository

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
     const filmes = new Map()
    
     const getFilme = (id) => {
        const filme = filmes.get(id)
        if (!filme)
            return new model.MovieDetailDto(obj)

        return  filme;
        }
/*
    
    const addFilme = () => {
        let patient = filmes.get(filmes);
        if (!filmes) {
            filmes.set(event.source, patient = {
                FilmeData: new MovieDetailDto(obj)

            })
        }

        let eventList = patient.events.get(event.type)
        if (!eventList) 
            patient.events.set(event.type, eventList = [])

        eventList.push(event);
    }

*/
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
        getFilme: (filmeId, cb) => {
            const filme = getFilme(filmeId)
          cb(null, filme ? filme.filmesData : filme)
        },

        /**
         * Updates the given cinema information.
         * @param   {Cinema} cinema - The cinema information to be updated.
         * @param   {writeCallback} cb - Completion callback.
         * @memberof CinemasRepo# 
         */
        updateFilme: (filme, cb) => {
            let existingfilmes = filmes.get(Number(cinema.id))

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
