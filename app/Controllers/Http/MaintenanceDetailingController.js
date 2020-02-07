'use strict'

const Database = use('Database')
const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()

const MaintenanceDetailing = use('App/Models/MaintenanceDetailing')
const RulesBusinessMaintenanceDetailing = use('App/RulesBusiness/RulesBusinessMaintenanceDetailing')

class MaintenanceDetailingController {

  async store ({ request, auth }) {

    const {
       EquipamentoID,
       UsuarioID,
       ManutencaoItenID,
       UsuarioMecanicoID,
       MotivoManutencaoID,
       OrdemManutencaoID,
       Observacao,
       ControleHoraID,
       OperacaoID,
       OcorrenciaID,
    } = request.all()

    return await RulesBusinessMaintenanceDetailing.MaintenanceDetailingInsert(
      ManutencaoItenID,
      UsuarioMecanicoID,
      NewcurrentDate,
      Observacao,
      EquipamentoID,
      ControleHoraID,
      OperacaoID,
      OcorrenciaID,
      UsuarioID,
      NewcurrentDate,
      OrdemManutencaoID,
      MotivoManutencaoID
    )

  }

}

module.exports = MaintenanceDetailingController
