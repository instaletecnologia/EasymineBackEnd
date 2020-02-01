'use strict'

const MaintenanceReason = use('App/Models/MaintenanceReason')
const Database = use('Database')

class MaintenanceReasonController {
  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const maintenanceReason = await MaintenanceReason.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return maintenanceReason
  }

  async indexAll ({ request, response, view }) {
console.log('entrei')
    const maintenanceReason = await Database
   .select('man.MotivosManutencao.MotivoManutencaoID','man.MotivosManutencao.Descricao')
   .from('man.MotivosManutencao')
   //.where({ 'man.MotivosManutencao.Ativo': true })
   console.log('sai')
    return maintenanceReason
  }

  async show ({ params }) {
    const maintenanceReason = await MaintenanceReason.query()
    .where('Ativo', true)
    .where('MotivoManutencaoID', params.id)
    .fetch()

    return maintenanceReason
  }

}

module.exports = MaintenanceReasonController
