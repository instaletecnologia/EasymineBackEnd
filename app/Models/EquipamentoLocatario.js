'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoLocatario extends Model {

  static get table () {
    return 'dbo.EquipamentosAlocador'
  }

  static get primaryKey () {
    return 'EquipamentoLocatarioID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoLocatarioID',
      'Descricao'
    ]
  }

}

module.exports = EquipamentoLocatario
