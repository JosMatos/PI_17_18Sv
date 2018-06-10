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
  const reservas = new Map()
  const sessoesdb = 'http://127.0.0.1:5984/sessions/'

  const getSession= (sessionid, cb) => {


    const path = sessoesdb+sessionid.toUpperCase()
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
    __reservas__: reservas,

    /**
     * Registers the given event.
     * @param   {Event} event - The event to be registered.
     * @param   {writeCallback} cb - Completion callback.
     * @memberof CinemasRepo#
     */
    registerEvent: (event, cb) => { addEvent(event); cb() },


    insertSession: (sessao, cb) => {

      const path = sessoesdb+sessao.id.toUpperCase()

      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(sessao)
      }
      http(path, options, (err, res, body) => {
        if(err) return cb(err)
        cb(res,null)
      })

    },
    removeSessao: (SessionKey, SessionRev, cb) => {
      const path = sessoesdb + SessionKey + '?rev=' + SessionRev
      const options = { method: "DELETE", headers: {"Content-Type": "application/json"} }
      http(path, options, (err, res, body) => {
          if (err) return cb(err)
          cb(body, null)
        }
      )
    },



    getallSessions : (cb)=>{
      let path = sessoesdb + '_all_docs'
      http.get(path, (err, res,allcinemas) => {
        if (err) return cb(err)
        let cinemasfull=[]
        let index =0
        allcinemas=JSON.parse(allcinemas)
        if (allcinemas.rows.length==0)
          cb(null,cinemasfull)

        allcinemas.rows.forEach(obj=>
        {
          let id = obj.id
          getSession(id,(cinema,err)=>{
            if (err) return cb(err)
            if (cinema)
              cinemasfull.push(cinema)
            if (++index==allcinemas.total_rows)
            {
              cb(null,cinemasfull)
            }
          })
        })

      })

    }

  }
}
