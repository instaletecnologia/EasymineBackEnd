'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FrenteLocal extends Model {

  static get table () {
    return 'dbo.FrentesLocais'
  }

  static get primaryKey () {
    return 'FrenteLocalID'
  }
  
  static get incrementing () {
    return true
  }

  Frente(){
    return this.belongsTo('App/Models/FrenteLocal', 'FrenteLocalID', 'FrenteLocalID')
  }

}

module.exports = FrenteLocal
