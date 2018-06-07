/**
 * Module that contains the specification of the patients' heartbeat repository.
 * @module salas_repo
 * @public
 */

module.exports.createRepository = createRepository

const http = require('request')
/**
 * Module dependencies.
 * @private
 */
const model = require('../Datatypes/OTRAObj')



function createRepository(events) {
    const salas = new Map()

    const getStatus = (salas) => {

        const sala = salas.get(salaId)
        if (!sala)
            return new model.salasStatus(salaId, 'UNKNOWN')

        const Filmes = sala.events.get('Heartbeat') 
        if (!Filmes || Filmes.length == 0)
            return new model.SalasStatus(patientId, 'UNKNOWN')

        const lastfilme = Filmes[Filmes.length - 1].timestamp
        const filme = computePatientHealth(lastHeartbeat, sala.salaData.heartRate)
        return new model.SalasStatus(salasId, filme, sala.salaData.name)
    }

    const addEvent = (event) => {
        let sala = salas.get(event.source)
        if (!sala) {
            salas.set(event.source, sala = { 
                salaData: new model.Sala(event.source, DEFAULT_HEARTRATE), 
                events: new Map()
            })
        }

        let eventList = sala.events.get(event.type)
        if (!eventList) 
            sala.events.set(event.type, eventList = [])

        eventList.push(event)
    }

    if (events && events instanceof Array)
        events.forEach((event) => addEvent(event))

    return {
       
        registerEvent: (event, cb) => { addEvent(event); cb() },

        
        getSalas: (cb) => {
            const salasData = Array.from(salas.keys()).map(
                (salaId) => salas.get(salaId).salaData
            )
            cb(null, salasData)
        },

        getSalasStatus: (cb) => { 
            const salasStatus = Array.from(salas.keys()).map((salasId) => getStatus(salaId))
            cb(null, salasStatus)
        },

        
        getSalasStatus: (salasId, cb) => cb (null, getStatus(salasId)),
        
        /**
         * 
         */
        
        getSalasEvents: (salaId, eventType, cb) => {
            const sala = salas.get(salaId)
            if (!sala || !sala.events.get(eventType))
                return cb(null, [])
            cb(null, salas.get(salaId).events.get(eventType))
        }
    }
}
