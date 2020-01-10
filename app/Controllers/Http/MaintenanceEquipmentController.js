'use strict'
const Database = use('Database')
const _ = use('lodash')

class MaintenanceEquipmentController {

  async getMaintenanceEquipments(){


    let equipments = (await Database.raw(` exec [man].[spQDataControleHorasCategoriaTempoFilhasHMAcontecendo] null, null `)).map(row => row)

    return  equipments;

  }

}

module.exports = MaintenanceEquipmentController
