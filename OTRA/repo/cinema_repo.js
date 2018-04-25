'use strict'

/**
 * Module that contains the specification of the cinema repository.
 * @module cinemas_repo
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
 * @constructs @type CinemaRepo
 * @param   
 * @return  {CinemasRepo} The newly created repository.
 * @api public
 */
function createRepository() {
     const cinemas = new Map()
     const filmes = new Map()
     const salas = new Map()
     const sessoes = new Map()

    
     const getCinema = (cinemaId) => {
        const cinema = cinemas.get(cinemaId)
        if (!cinema)
            return new model.Cinema(cinemaId, 'UNKNOWN', 'UNKNOW')

        return  cinema;   
        }

    
    const addCinema = () => {
        let patient = cinema.get(name,cidade_localizacao);
        if (!cinema) {
            cinemas.set(event.source, patient = { 
                CinemaData: new model.Cinema(id, name, cidade_localizacao), 
                sessoes: new Map()
            })
        }

        let eventList = patient.events.get(event.type)
        if (!eventList) 
            patient.events.set(event.type, eventList = [])

        eventList.push(event);
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
        getCinema: (cinemaId, cb) => {
            const cinema = getCinema(Number(cinemaId))
            cb(null, cinema ? cinema.cinemaData : cinema)
        },

        /**
         * Updates the given cinema information.
         * @param   {Cinema} cinema - The cinema information to be updated.
         * @param   {writeCallback} cb - Completion callback.
         * @memberof CinemasRepo# 
         */
        updateCinema: (cinema, cb) => {
            let existingCinema = cinemas.get(Number(cinema.id))
            
            // se não existe cinema crio a nova entidade Cinema
            if (!existingCinema) {
                existingCinema = {
                    cinemaData: new model.Cinema(cinema.id, cinema.name, cinema.cidade_localizacao), 
                    salas: new Map()
                }
            }
            existingCinema.cinemaData.name = cinema.name
            existingCinema.cinemaData.cidade_localizacao= cinema.cidade_localizacao
            cinemas.set(cinema.id, existingCinema)
            cb()
        },

        /** 
         * Gets the list of Movie Room from Cinema.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */

         getCinemaSalas: (cinemaId, cb) => { 
            const cinemaSalas = Array.from(cinemas.keys()).map((cinemaId) => getSalas(cinemaId))
            cb(null, cinemaSalas)
        },

        /**
         * Gets the Max Cinema ID present in Cinema Repo.
         * @param   {readCallback} cb - Completion callback.
         * @memberof CinemasRepo#
         */
        getMaxId: () => {
            return cinemas.size
        }
       
    }
}
