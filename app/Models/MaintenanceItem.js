'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceItem extends Model {

  static get table () {
    return 'man.ManutencaoItens'
  }

  static get primaryKey () {
    return 'ManutencaoItenID'
  }

  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'ManutencaoItenID',
      'ClasseFalhaID',
      'Descricao',
      'Ativo',
      'CodigoIntegracao',
      'TipoInputID',
      'UsuarioRegistroID',
      'UsuarioAlteracaoID',
      'DataRegistro',
      'DataAlteracao',
      'ObsObrigatoria',
    ]
  }

}

module.exports = MaintenanceItem
