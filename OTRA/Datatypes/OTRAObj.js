'use strict'

module.exports.Cinema = Cinema
/*
module.exports.Filme  = Filme
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


