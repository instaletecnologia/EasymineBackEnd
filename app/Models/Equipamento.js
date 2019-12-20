'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipamento extends Model {

  static get table () {
    return 'dbo.Equipamentos'
  }

  static get primaryKey () {
    return 'EquipamentoID'
  }
  
  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'EquipamentoID', 'EquipamentoTipoID', 'TagPrefixo', 'TagNumero', 'Habilitado', 'Ativo',
    ]
  }

  Tipo(){
    return this.belongsTo('App/Models/EquipamentoTipo', 'EquipamentoTipoID', 'EquipamentoTipoID')
  }

  Classificacao(){
    return this.belongsTo('App/Models/EquipamentoClassificacao', 'EquipamentoClassificacaoID', 'EquipamentoClassificacaoID')
  }

  Modelo(){
    return this.belongsTo('App/Models/EquipamentoModelo', 'EquipamentoModeloID', 'EquipamentoModeloID')
  }

  Locatario(){
    return this.belongsTo('App/Models/EquipamentoLocatario', 'EquipamentoLocatarioID', 'EquipamentoLocatarioID')
  }

  Proprietario(){
    return this.belongsTo('App/Models/EquipamentoProprietario', 'EquipamentoProprietarioID', 'EquipamentoProprietarioID')
  }

  Rastreamento(){
    return this.belongsTo('App/Models/EquipamentoRastreamento', 'EquipamentoTipoRastreamentoID', 'EquipamentoTipoRastreamentoID')
  }

  GeomReferencias () {
    return this.hasMany('App/Models/GeomReferencia', 'EquipamentoID', 'EquipamentoID')
  }

  UltimaLocalizacao () {
    return this.hasOne('App/Models/GeomReferencia', 'EquipamentoID', 'EquipamentoID').orderBy('DataHoraServidor', 'DESC').limit(1)
  }

}

module.exports = Equipamento
