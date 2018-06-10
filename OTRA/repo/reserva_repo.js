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
  const reservas = new Map()



  const getReserva = (resrvaId) => {
    const cinema = cinemas.get(resrvaId)
    if (!cinema)
      return new model.reserva(cinemaId, 'UNKNOWN', 'UNKNOW')
    return  cinema;
  }

  return {

    /**
     * Exposed for testing purposes only
     */
    __reservas__: reservas,

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
    }
    
  }
}
