'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceRelease extends Model {

  static get table () {
    return 'man.ManutencaoLiberacaoEquipamentoOperacao'
  }

  static get primaryKey () {
    return 'ManutencaoLiberacaoEquipamentoOperacaoID'
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
      'ManutencaoLiberacaoEquipamentoOperacaoID'
      ,'MecanicoID'
      ,'Horimetro'
      ,'TipoLancamentoID'
      ,'OperacaAnteriorID'
      ,'OperacaoPosteriorID'
      ,'ControleHoraAnteriorID'
      ,'ControleHoraPosteriorID'
      ,'OcorrenciaAnteriorID'
      ,'OcorrenciaPosteriorID'
      ,'UsuarioRegistroID'
      ,'UsuarioAlteracaoID'
      ,'DataRegistro'
      ,'DataAlteracao'
    ]
  }

}

module.exports = MaintenanceRelease
