'use strict'
const _ = require("lodash");
const moment = require("moment");

const Defaults = use('App/Defaults/Dates')

const RulesBusinessMaintenanceDetailing = use('App/RulesBusiness/RulesBusinessMaintenanceDetailing')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')

class MaintenanceDetailingController {

  async store ({ request, auth, response }) {
  const NewcurrentDate =  await Defaults.currentDate()
  const { EquipamentoID, DataHora, UsuarioID, ManutencaoItenID, UsuarioMecanicoID, MotivoManutencaoID,
  OrdemManutencaoID, Observacao, ControleHoraID, OcorrenciaID } = request.all()

  // Caso não seja passado a ordem de manutenção vamos setar como nula
    let orderMaintenanceID = null
    if (!OrdemManutencaoID) {
      orderMaintenanceID = OrdemManutencaoID
    }

  // Buscamos a operacao atual do equipamento.
    const operation = await RulesBusinessEquipmentOperation.OperationGetLast(EquipamentoID)
      // Verificamos se existe operação atual caso não exista vamos enviar a resposta que será traduzida no front end
      if (_.isEmpty(operation)) {
        return response.status(404).json({ message: "maintenance.error.not.allocated.activity"})
      }
      // pegamos o valor OperacaoID do array operation
      const OperationID = _.get(_.first(operation), 'OperacaoID')
      //Vamos convert a hora pois vem com formato '"2020-02-16T11:31:15.980Z"' o correto 2020-02-16T11:31:15.980Z
      const date = await Defaults.formatDates(DataHora)

    // Vamos inserir o detalhamento
    try {
      const maintenanceDetailing = await RulesBusinessMaintenanceDetailing.MaintenanceDetailingInsert(
        ManutencaoItenID, UsuarioMecanicoID, date, Observacao, EquipamentoID, ControleHoraID,
        OperationID, OcorrenciaID, UsuarioID, NewcurrentDate, OrdemManutencaoID, MotivoManutencaoID,
      )
      return maintenanceDetailing
    } catch (error) {
      return response.status(404).json({ message: "maintenance.error.not.possible.insert.details"})
    }

  }

}

module.exports = MaintenanceDetailingController
