const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()

const Database = use('Database')
const MaintenanceRelease = use('App/Models/MaintenanceRelease')

class RulesBusinessMaintenanceRelease {

// função para inserir uma nova liberação de equipamento para operacao
static async MaintenanceReleaseInsert(mechanicallID,
  horimeter,
  operationPreviousID,
  operationLastID,
  controlHourPreviousID,
  controlHourLastID,
  ocorrencePreviousID,
  ocorrenceLastID,
  userID,
  date
  ) {

  const maintenanceRelease = await MaintenanceRelease.create({
     'MecanicoID' : mechanicallID
    ,'Horimetro' : horimeter
    ,'TipoLancamentoID': 2	// Gerencial
    ,'OperacaAnteriorID': operationPreviousID
    ,'OperacaoPosteriorID': operationLastID
    ,'ControleHoraAnteriorID': controlHourPreviousID
    ,'ControleHoraPosteriorID': controlHourLastID
    ,'OcorrenciaAnteriorID': ocorrencePreviousID
    ,'OcorrenciaPosteriorID': ocorrenceLastID
    ,'UsuarioRegistroID': userID
    ,'DataRegistro': date
  })

     return maintenanceRelease
}

}

module.exports = RulesBusinessMaintenanceRelease;
