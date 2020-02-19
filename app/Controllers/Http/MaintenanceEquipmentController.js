'use strict'
const Database = use('Database')

const _ = require("lodash");

const Defaults = use('App/Defaults/Dates')
const IdGenerator = use('App/Defaults/IdGenerator')

const RulesBusinessOccurrence = use('App/RulesBusiness/RulesBusinessOccurrence')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')
const RulesBusinessEquipmentControlHour = use('App/RulesBusiness/RulesBusinessEquipmentControlHour')
const RulesBusinessMaintenanceEquipment = use('App/RulesBusiness/RulesBusinessMaintenanceEquipment')
const RulesBusinessMessage = use('App/RulesBusiness/RulesBusinessMessage')

class MaintenanceEquipmentController {

  async getMaintenanceEquipments(){
    let equipments =
    (await Database.raw(` exec [man].[spQDataControleHorasCategoriaTempoFilhasHMAcontecendo] null, null `))
    .map(row => row)

    return  equipments;
  }

// Adiciona equipamento em manutenção
  async store ({ request, response, auth }) {
    const NewcurrentDate =  await Defaults.currentDate()
    const { EquipamentoID, OcorrenciaID, Horimetro, UsuarioID, Observacao } = request.all()

    const horimetro = Horimetro.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.')

    let note = ""
    if (Observacao != null) {
      note = Observacao
     }

    //caso o parametro UsuarioID não tenha vamos vamos setar o com ADMIN
    const usuarioID =  UsuarioID
     if(!usuarioID) {
      usuarioID = auth.user.UsuarioID
     }

    //buscamos os dados da ocorrencia
    let ocorrence = null
    ocorrence = await RulesBusinessOccurrence.OccurrenceByID(OcorrenciaID)
    if (_.isEmpty(ocorrence)) {
      return response.status(404).json({ message: "maintenance.error.release.WithoutOccurrence" })
      }


    let Operation = null

      // Vmaos pegar a ultima operacao do equipamento
     Operation = await RulesBusinessEquipmentOperation.OperationGetLast(EquipamentoID)

    // Se não existir uma operação vamos emitir uma mensagem de erro
    if (_.isEmpty(Operation)) {
      return response.status(404).json({ message: "maintenance.error.not.allocated.activity" })
    }

    let operationId = _.get(_.first(Operation), 'OperacaoID')
    const operationLastID = _.get(_.first(Operation), 'OperacaoID')
    let frontID = _.get(_.first(Operation), 'FrenteID')


    //Se o equipamento estiver com atividade e a ocorrencia estiver configurada para n permnanecer na atividade vamos inserir uma nova
    //Operacao com frenteID = 0
    if (frontID !== 0) {
      const stayActivity = _.get(_.first(ocorrence), 'PermanecerNaAtividade')

       if ( stayActivity === false ) {
            frontID = 0
            operationId = IdGenerator.operation(EquipamentoID)

            // Vmaos inserir uma nova operação
            try {
               await RulesBusinessEquipmentOperation.OperationInsert(operationId, EquipamentoID,
                NewcurrentDate, frontID, usuarioID, note, horimetro, "M", operationLastID)
            } catch (error) {
              return response.status(404).json({ message: "maintenance.error.add.NoCreateNewOperation" })
            }
        }

    }

    //criamos o controlehoraID
    let id = IdGenerator.controlHour(EquipamentoID)

    // Vamos inserir uma novo registro em Manutencao
    await RulesBusinessMaintenanceEquipment.MaintenanceEquipmentInsert(EquipamentoID, NewcurrentDate, id, operationId, note, NewcurrentDate, usuarioID)

    const ocorrenceTypeID = _.get(_.first(ocorrence), 'OcorrenciaTipoID')
    // criamos o novo registro na tabela controlehoras
    const controlTimeID = await RulesBusinessEquipmentControlHour.EquipmentControlHourInsert(
     id,EquipamentoID,OcorrenciaID, operationId, NewcurrentDate, null, 0, 0, 0, 0, 0, 0, 0, 0,'M',
     '#MANUTENCAO', 0, 0, ocorrenceTypeID, note, 0, frontID, horimetro, usuarioID)

    // vamos inserir uma mensagem do tipo ocorrencia para que o embarcado receba a alteração de ocorrencia
    await RulesBusinessMessage.MessageInsert(EquipamentoID, "Equipamento em Manutenção", NewcurrentDate, usuarioID, 5,
      frontID, null, null, 1, OcorrenciaID, id)

    return id
  }

}

module.exports = MaintenanceEquipmentController
