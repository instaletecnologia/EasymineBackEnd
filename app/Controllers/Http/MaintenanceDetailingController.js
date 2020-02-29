'use strict'
const _ = require("lodash");
const moment = require("moment");

const Database = use('Database')
const Defaults = use('App/Defaults/Dates')

const RulesBusinessMaintenanceDetailing = use('App/RulesBusiness/RulesBusinessMaintenanceDetailing')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')
const RulesBusinessEquipmentControlHour = use('App/RulesBusiness/RulesBusinessEquipmentControlHour')

class MaintenanceDetailingController {

  async store ({ request, auth, response }) {
  const NewcurrentDate =  await Defaults.currentDate()
  const {
  ClasseFalhaID,
  ControleHoraID,
  EquipamentoID,
  ManutencaoItenID,
  MotivoManutencaoID,
  Observacao,
  OcorrenciaID,
  OrdemManutencaoID,
  UsuarioID,
  UsuarioMecanicoID,
  dataHora,
    } = request.all()

  //Vamos convert a hora pois vem com formato '"2020-02-16T11:31:15.980Z"' o correto 2020-02-16T11:31:15.980Z
      const date = await Defaults.formatDates(dataHora)

  // Validação - Não permitir efetuar detlhamento com data existente para a manutencão.
       const validatoDetailingRepeatDate = await Database
       .select('ManutencaoDetalheID')
       .from('man.ManutencaoDetalhes')
       .where({'ControleHoraID': ControleHoraID.toString()})
       .where({'DataHora': date})

       if (!_.isEmpty(validatoDetailingRepeatDate)) {
         return response.status(404).json({ message: "maintenance.validation.detailing-repeat-maintenance"})
       }

  // Validação - Não permitir efetuar detlhamento com data anterior a data inicio da manutenção.
      const validatoDetailingBeforeMaintenance = await RulesBusinessEquipmentControlHour.EquipmentoControlHourGetID(ControleHoraID)

      if (!_.isEmpty(validatoDetailingBeforeMaintenance)) {
          const dateStart = _.get(_.first(validatoDetailingBeforeMaintenance), 'DataHoraInicio')
          const dateStartMaintenance = moment.utc(dateStart).format('YYYYMMDD HH:mm:ss.SSS')

        if ( dateStartMaintenance > date ) {
          return response.status(404).json({ message: "maintenance.validation.detailing-before-maintenance"})
        }
      }

  // Validação - Não permitir efetuar detlhamento com data apos a data a data atual do servidor.
     if ( date > NewcurrentDate ) {
       return response.status(404).json({ message: "maintenance.validation.detailing-after-now"})
     }

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

    // Vamos inserir o detalhamento
      const maintenanceDetailing = await RulesBusinessMaintenanceDetailing.MaintenanceDetailingInsert(
        ManutencaoItenID, UsuarioMecanicoID, date, Observacao, EquipamentoID, ControleHoraID,
        OperationID, OcorrenciaID, UsuarioID, NewcurrentDate, OrdemManutencaoID, MotivoManutencaoID,
      )

      return maintenanceDetailing

  }

}

module.exports = MaintenanceDetailingController
