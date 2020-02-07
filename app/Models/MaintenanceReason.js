'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceReason extends Model {

  static get table () {
    return 'man.MotivosManutencao'
  }

  static get primaryKey () {
    return 'MotivoManutencaoID'
  }

  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'MotivoManutencaoID',
      'Descricao',
      'Ativo',
      'CodigoIntegracao',
      'TipoInputID',
      'UsuarioRegistroID',
      'UsuarioAlteracaoID',
      'DataRegistro',
      'DataAlteracao',
    ]
  }

}

module.exports = MaintenanceReason
