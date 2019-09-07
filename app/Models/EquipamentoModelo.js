'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoModelo extends Model {

  static get table () {
    return 'dbo.EquipamentosModelos'
  }

  static get primaryKey () {
    return 'EquipamentoModeloID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoModeloID',
      'Descricao'
    ]
  }

  Marca(){
    return this.belongsTo('App/Models/EquipamentoModeloMarca', 'EquipamentoMarcaID', 'EquipamentoMarcaID')
  }

}

module.exports = EquipamentoModelo
