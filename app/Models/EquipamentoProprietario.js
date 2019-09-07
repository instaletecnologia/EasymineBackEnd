'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoProprietario extends Model {

  static get table () {
    return 'dbo.EquipamentosProprietarios'
  }

  static get primaryKey () {
    return 'EquipamentoProprietarioID'
  }
  
  static get incrementing () {
    return false
  }

  static get visible(){
    return [
      'EquipamentoProprietarioID',
      'Descricao'
    ]
  }

}

module.exports = EquipamentoProprietario
