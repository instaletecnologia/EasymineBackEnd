'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceEquipment extends Model {

  static get table () {
    return 'man.EquipamentosManutencoes'
  }

  static get primaryKey () {
    return 'EquipamentoManutencaoID'
  }

  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoManutencaoID',
      'EquipamentoID',
      'Data',
      'DataLiberacao',
      'ControleHoraID',
      'OperacaoID',
      'Observacoes',
      'DataRegistro',
      'UsuarioRegistroID',
      'DataAlteracao',
      'UsuarioAtualizaID',
      'DataPrevisao',
    ]
  }

}

module.exports = MaintenanceEquipment
