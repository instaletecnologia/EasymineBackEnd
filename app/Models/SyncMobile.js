'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SyncMobile extends Model {

  static get table () {
    return 'sync.SyncMobile'
  }

  static get primaryKey () {
    return 'SyncMobileID'
  }

  static get incrementing () {
    return true
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }

  static get visible(){
    return [
      'SyncMobileID',
      'EquipamentoID',
      'RegistroID',
      'DescricaoTabela',
      'TipoOperacao',
      'DataCadastro',
      'Status',
      'DataAlteracaoStatus',
      'Url'
    ]
  }

}

module.exports = SyncMobile
