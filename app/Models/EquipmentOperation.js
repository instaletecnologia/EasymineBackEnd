'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipmentOperation extends Model {

  static get table () {
    return 'dbo.Operacoes'
  }

  static get primaryKey () {
    return 'OperacaoID'
  }

  static get incrementing () {
    return false
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }

  static get visible(){
    return [
      'OperacaoID'
      ,'FrenteID'
      ,'EquipamentoID'
      ,'DataCadastro'
      ,'HorimetroInicial'
      ,'HorimetroFinal'
      ,'KmInicial'
      ,'KmFinal'
      ,'DMT'
      ,'DataInicio'
      ,'DataFim'
      ,'Origem'
      ,'DataRegistro'
      ,'LastEditDate'
      ,'CreationDate'
      ,'Obs'
      ,'OperacaoRefID'
      ,'UsuarioRegistroID'
      ,'UsuarioAtualizaID'
    ]
  }

}

module.exports = EquipmentOperation
