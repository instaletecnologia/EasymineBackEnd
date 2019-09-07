'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipamentoModeloMarca extends Model {

  static get table () {
    return 'dbo.EquipamentosMarcas'
  }

  static get primaryKey () {
    return 'EquipamentoMarcaID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoMarcaID',
      'Descricao'
    ]
  }

}

module.exports = EquipamentoModeloMarca
