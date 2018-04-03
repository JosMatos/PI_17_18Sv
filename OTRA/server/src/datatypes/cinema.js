'use strict'

module.exports.Cinema = Cinema

/**
 * Module that contains the specification of the existing data types.
 * @module datatypes
 * @public
 */

/**
 * Constructor function that initializes a new Cinema instance with the given arguments.
 * @param       {string}  id - The cinema identifier.
 * @param       {string?} name - The Cinema name.
 * @param       {string?} city - The city where the cinema is located.
 * @class
 * @classdesc Data type that represents Cinema to be monitored.
 * @api public
 */
function Cinema(id, name, city) {
    if(!this) return { id, name, city }
    this.id = id
    this.name = name
    this.city = city
}