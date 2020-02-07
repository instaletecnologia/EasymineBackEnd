'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = use('moment')

class GeomReferencia extends Model {

  static get table () {
    return 'dbo.GeomReferencias'
  }

  static get primaryKey () {
    return 'GeomReferenciaID'
  }
  
  static get incrementing () {
    return false
  }

  static get visible () {
    return [
      'GeomReferenciaID', 
      'EquipamentoID', 
      'DataHoraServidor',
      'DataHoraGPS',
      'Latitude',
      'Longitude',
      'Altitude',
      'Direcao',
      'DriverID',
      'Conectado'
    ]
  }

  static get computed(){
    return ['Conectado']
  }

  Equipamento () {
    return this.belongsTo('App/Models/Equipamento', 'EquipamentoID', 'EquipamentoID')
  }

  getConectado({ DataHoraServidor }){
    const dateSplit = moment(DataHoraServidor).utc().toISOString().split('T');
    const date = dateSplit[0];
    const hour = dateSplit[1].split('.')[0];
    const referenceDateHour = moment(`${date} ${hour}`);
    const secondsDiff = moment().diff(referenceDateHour, 'seconds');
    return secondsDiff < 30;
  }

}

module.exports = GeomReferencia
