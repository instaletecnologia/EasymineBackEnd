'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoTipoRastreamento extends Model {

  static get table () {
    return 'dbo.EquipamentosTiposRastreamentos'
  }

  static get primaryKey () {
    return 'EquipamentoTipoRastreamentoID'
  }
  
  static get incrementing () {
    return false
  }

  static get visible () {
    return [
      'EquipamentoTipoRastreamentoID',
      'Descricao'
    ]
  }

}

module.exports = EquipamentoTipoRastreamento
