'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parametro extends Model {

  static get table () {
    return 'dbo.Parametros'
  }

  static get primaryKey () {
    return 'ParametroID'
  }
  
  static get incrementing () {
    return false
  }

}

module.exports = Parametro
