'use strict'

const RulesBusinessMaintenanceDetailing = use('App/RulesBusiness/RulesBusinessMaintenanceDetailing')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')

const Defaults = use('App/Defaults/Dates')


class MaintenanceDetailingController {

  async store ({ request, auth, response }) {

  const { EquipamentoID, DataHora, UsuarioID, ManutencaoItenID, UsuarioMecanicoID, MotivoManutencaoID, OrdemManutencaoID, Observacao, ControleHoraID, OcorrenciaID } = request.all()
  console.log(Defaults.formatDates(DataHora));
  return DataHora
  const operation = await RulesBusinessEquipmentOperation.OperationGetLast(EquipamentoID)

  let orderMaintenanceID = null
  if (OrdemManutencaoID != null) {
    orderMaintenanceID = OrdemManutencaoID
  }

   if (operation.length === 0) {
      return response.status(404).json({ message: "maintenance.error.add.NoCreateNewOperation" })
    }
    const OperationID = operation[0].OperacaoID;
    const NewcurrentDate = Defaults.currentDate();

    const maintenanceDetailing = await RulesBusinessMaintenanceDetailing.MaintenanceDetailingInsert(
        ManutencaoItenID,
        UsuarioMecanicoID,
        DataHora,
        Observacao,
        EquipamentoID,
        ControleHoraID.toString(),
        OperationID.toString(),
        OcorrenciaID,
        UsuarioID,
        NewcurrentDate,
        orderMaintenanceID,
        MotivoManutencaoID
      )

    return maintenanceDetailing

  }

}

module.exports = MaintenanceDetailingController
