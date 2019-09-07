'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoClassificacao extends Model {

  static get table () {
    return 'dbo.EquipamentosClassificacoes'
  }

  static get primaryKey () {
    return 'EquipamentoClassificacaoID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoClassificacaoID',
      'Descricao'
    ]
  }

}

module.exports = EquipamentoClassificacao
