'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Frente extends Model {

  static get table () {
    return 'dbo.Frentes'
  }

  static get primaryKey () {
    return 'FrenteID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return ['Descricao']
  }

}

module.exports = Frente
