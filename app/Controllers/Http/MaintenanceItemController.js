'use strict'

const MaintenanceItem = use('App/Models/MaintenanceItem')
const Database = use('Database')

class MaintenanceItemController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const maintenanceItem = await MaintenanceItem.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return maintenanceItem
  }

  async show ({ params }) {
    const maintenanceItem = await MaintenanceItem.query()
    .where('Ativo', true)
    .where('ManutencaoItenID', params.id)
    .fetch()

    return maintenanceItem
  }

  async showMaintenanceItemByClasseFalhaIDByEquipamentoModeloID ({ request, response }) {
    const { ClasseFalhaID, EquipamentoModeloID } = request.all()

   if (!ClasseFalhaID) {
     return response
     .status(404)
     .json({ message: "maintenance.error.release.WithoutOccurrence" })
   }

   if (!EquipamentoModeloID) {
     return response
     .status(404)
     .json({ message: "maintenance.error.release.WithoutOccurrence" })
  }

   const manutencaoItens = await Database
   .select('man.ManutencaoItens.ManutencaoItenID','man.ManutencaoItens.Descricao')
   .from('man.ManutencaoItensEquipamentosModelos')
   .innerJoin('man.ManutencaoItens', 'man.ManutencaoItens.ManutencaoItenID', 'man.ManutencaoItensEquipamentosModelos.ManutencaoItenID')
   .leftJoin('man.ManutencaoItensEquiModelosEquiTipos','man.ManutencaoItensEquiModelosEquiTipos.ManutencaoItenEquipamentoModeloID', 'man.ManutencaoItensEquipamentosModelos.ManutencaoItenEquipamentoModeloID')
   .where({ 'man.ManutencaoItens.Ativo': true })
   .where({'man.ManutencaoItensEquipamentosModelos.EquipamentoModeloID': EquipamentoModeloID})
   .where({'man.ManutencaoItens.ClasseFalhaID': ClasseFalhaID})
   .groupByRaw('man.ManutencaoItens.ManutencaoItenID, man.ManutencaoItens.Descricao')
   .orderBy('man.ManutencaoItens.Descricao')

   return manutencaoItens
  }

}

module.exports = MaintenanceItemController
