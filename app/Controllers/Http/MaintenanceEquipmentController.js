'use strict'
const MaintenanceEquipment = use('App/Models/MaintenanceEquipment')
const Database = use('Database')
const _ = use('lodash')
const Defaults = use('App/Defaults/Dates')

class MaintenanceEquipmentController {

  async getMaintenanceEquipments(){
    let equipments = (await Database.raw(` exec [man].[spQDataControleHorasCategoriaTempoFilhasHMAcontecendo] null, null `)).map(row => row)

    return  equipments;
  }

  async store({ request, auth }){

    const data = request.only([
      'EquipamentoID',
      'ControleHoraID',
      'OperacaoID',
      'Observacoes',
    ])


    const newcurrentDate = Defaults.currentDate()

    const maintenanceEquipment = await MaintenanceEquipment.create({
      EquipamentoID: data.EquipamentoID,
      Data: newcurrentDate,
      ControleHoraID: data.ControleHoraID,
      OperacaoID: data.OperacaoID,
      Observacoes: data.Observacoes,
      DataRegistro: newcurrentDate,
      UsuarioRegistroID: await auth.check() ? auth.user.UsuarioID : 2115,
    })

     return maintenanceEquipment
  }


}

module.exports = MaintenanceEquipmentController
