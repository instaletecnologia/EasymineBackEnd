'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceDetailing extends Model {

  static get table () {
    return 'man.ManutencaoDetalhes'
  }

  static get primaryKey () {
    return 'ManutencaoDetalheID'
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
      'ManutencaoDetalheID'
      ,'ManutencaoItenID'
      ,'MecanicoID'
      ,'DataHora'
      ,'Observacao'
      ,'EquipamentoID'
      ,'ControleHoraID'
      ,'OperacaoID'
      ,'OcorrenciaID'
      ,'UsuarioRegistroID'
      ,'UsuarioAlteracaoID'
      ,'DataRegistro'
      ,'DataAlteracao'
      ,'OrdemManutencaoID'
      ,'MotivoManutencaoID'
    ]
  }

}

module.exports = MaintenanceDetailing
