'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoClassificacao extends Model {

  static boot () {
    super.boot()

    this.addHook('afterCreate', 'EquipamentoClassificacaoHook.insertNewRecordSyncMobile')
    this.addHook('beforeUpdate', 'EquipamentoClassificacaoHook.insertNewRecordSyncMobile')
  }

  static get table () {
    return 'dbo.EquipamentosClassificacoes'
  }

  static get primaryKey () {
    return 'EquipamentoClassificacaoID'
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
      'EquipamentoClassificacaoID',
      'Descricao',
      'Ativo',
      'UsuarioRegistroID',
      'UsuarioAtualizaID',
      'DataCadastro',
      'DataAtualizacao',
    ]
  }

}

module.exports = EquipamentoClassificacao
