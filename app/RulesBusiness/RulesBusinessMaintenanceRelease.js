const Model = use("Model");

const Database = use('Database')

const _ = require("lodash");


const MaintenanceRelease = use('App/Models/MaintenanceRelease')
const RulesBusinessEquipmentControlHour = use('App/RulesBusiness/RulesBusinessEquipmentControlHour')

class RulesBusinessMaintenanceRelease {

// função para inserir uma nova liberação de equipamento para operacao
static async MaintenanceReleaseInsert(
  equipmentID,
  mechanicallID,
  horimeter,
  operationLastID,
  controlHourLastID,
  ocorrenceLastID,
  userID,
  date
  ) {

  const equipmentControlTimePrevious = await RulesBusinessEquipmentControlHour.EquipmentoControlHourGetLast(equipmentID)
  const controlHourPreviousID = _.get(_.first(equipmentControlTimePrevious), 'ControleHoraID')
  const operationPreviousID = _.get(_.first(equipmentControlTimePrevious), 'OperacaoID')
  const ocorrencePreviousID = _.get(_.first(equipmentControlTimePrevious), 'OcorrenciaID')

    // criamos o novo registro na tabela
    const Id = await Database
    .insert({
       MecanicoID: mechanicallID
      ,Horimetro: horimeter
      ,TipoLancamentoID: 2
      ,OperacaAnteriorID: operationPreviousID
      ,OperacaoPosteriorID: operationLastID
      ,ControleHoraAnteriorID: controlHourPreviousID.toString()
      ,ControleHoraPosteriorID: controlHourLastID.toString()
      ,OcorrenciaAnteriorID: ocorrencePreviousID
      ,OcorrenciaPosteriorID: ocorrenceLastID
      ,UsuarioRegistroID: userID
      ,UsuarioAlteracaoID: null
      ,DataRegistro: date
      ,DataAlteracao: null
      })
    .into('man.ManutencaoLiberacaoEquipamentoOperacao')

    return Id
}

}

module.exports = RulesBusinessMaintenanceRelease;
