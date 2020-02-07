const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()

const Database = use('Database')
const MaintenanceDetailing = use('App/Models/MaintenanceDetailing')

class RulesBusinessMaintenanceDetailing {

// função para inserir uma nova liberação de equipamento para operacao
static async MaintenanceDetailingInsert(
  maintenanceItemID,
  mechanicallID,
  date,
  note,
  equipmentID,
  controlHourID,
  operationID,
  ocorrenceID,
  userID,
  date,
  maintenanceOrderID,
  maintenanceReasonID
  ) {

  const maintenanceDetailing = await MaintenanceDetailing.create({

      'ManutencaoItenID': maintenanceItemID
      ,'MecanicoID': mechanicallID
      ,'DataHora': date
      ,'Observacao': note
      ,'EquipamentoID': equipmentID
      ,'ControleHoraID': controlHourID
      ,'OperacaoID': operationID
      ,'OcorrenciaID': ocorrenceID
      ,'UsuarioRegistroID': userID
      ,'DataRegistro' : date
      ,'OrdemManutencaoID': maintenanceOrderID
      ,'MotivoManutencaoID': maintenanceReasonID
  })

     return maintenanceDetailing
}

}

module.exports = RulesBusinessMaintenanceDetailing;
