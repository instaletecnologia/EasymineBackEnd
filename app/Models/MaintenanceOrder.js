'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaintenanceOrder extends Model {

  static get table () {
    return 'man.OrdensManutencoes'
  }

  static get primaryKey () {
    return 'OrdemManutencaoID'
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
       'OrdemManutencaoID'
      ,'NumeroOrdem'
      ,'Data'
      ,'CategoriaID'
      ,'PrioridadeID'
      ,'Descricao'
      ,'Observacoes'
      ,'SetorID'
      ,'EquipamentoID'
      ,'UsuarioSolicitanteID'
      ,'Ramal'
      ,'DataRegistro'
      ,'UsuarioRegistroID'
      ,'DataAlteracao'
      ,'UsuarioAtualizaID'
      ,'Status'
      ,'EquipamentoManutencaoID'
    ]
  }

}

module.exports = MaintenanceOrder
