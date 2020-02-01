'use strict'

const MaintenanceOrder = use('App/Models/MaintenanceOrder')
const RulesBusinessMaintenanceOrder = use('App/RulesBusiness/RulesBusinessMaintenanceOrder')
const Database = use('Database')
class MaintenanceOrderController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const maintenanceOrder = await MaintenanceOrder.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return maintenanceOrder
  }

  async show ({ params }) {
    const maintenanceOrder = await MaintenanceOrder.query()
    .where('OrdemManutencaoID', params.id)
    .fetch()

    return maintenanceOrder
  }

  async showMaintenanceOrdersByEquipmentIDByCategoryTimeID ({ request, response }) {
    const { EquipamentoID, idCategoriasTempo } = request.all()

   if (!EquipamentoID) {
     return response
     .status(404)
     .json({ message: "maintenance.error.release.WithoutOccurrence" })
   }

   if (!idCategoriasTempo) {
     return response
     .status(404)
     .json({ message: "maintenance.error.release.WithoutOccurrence" })
  }

  return await RulesBusinessMaintenanceOrder.MaintenanceOrdersByEquipmentIDByCategoryTimeID(EquipamentoID,idCategoriasTempo)

  }

}

module.exports = MaintenanceOrderController
