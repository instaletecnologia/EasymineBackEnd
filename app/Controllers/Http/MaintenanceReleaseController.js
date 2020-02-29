'use strict'

const Database = use('Database')

const _ = require("lodash");

const Defaults = use('App/Defaults/Dates')
const IdGenerator = use('App/Defaults/IdGenerator')

const RulesBusinessOccurrence = use('App/RulesBusiness/RulesBusinessOccurrence')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')
const RulesBusinessEquipmentControlHour = use('App/RulesBusiness/RulesBusinessEquipmentControlHour')
const RulesBusinessMaintenanceEquipment = use('App/RulesBusiness/RulesBusinessMaintenanceEquipment')
const RulesBusinessMaintenanceRelease = use('App/RulesBusiness/RulesBusinessMaintenanceRelease')
const RulesBusinessMessage = use('App/RulesBusiness/RulesBusinessMessage')

class MaintenanceReleaseController {

// Libera o equipamento para operacao
  async store ({ request, auth, response }) {
    const NewcurrentDate =  await Defaults.currentDate()
    const { ControleHoraID, EquipamentoID, Horimetro, UsuarioID, UsuarioMecanicoID, Observacao } = request.all()

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

    //buscamos pelo tipo de ocorrencia -12 Equipamento entregue prar Operação
    let ocorrenceTypeID = -12
    let ocorrence = null
      ocorrence = await RulesBusinessOccurrence.OccurrenceByOccurenceTypeIDByEquipamentoID(ocorrenceTypeID, EquipamentoID)
      if (_.isEmpty(ocorrence)) {
        return response.status(404).json({ message: "maintenance.error.release.WithoutOccurrence" })
      }

      const ocorrenceID = _.get(_.first(ocorrence), 'OcorrenciaID')

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




    // Vamos fazer o update uma na Manutencao liberando o equipamento
    await RulesBusinessMaintenanceEquipment.MaintenanceEquipmenUpdate(EquipamentoID, NewcurrentDate, usuarioID)

    // criamos o novo registro na tabela controlehoras
    //criamos o controlehoraID
    let id = IdGenerator.controlHour(EquipamentoID)

    const controlTimeID = await RulesBusinessEquipmentControlHour.EquipmentControlHourInsert(
      id,EquipamentoID,ocorrenceID, operationId, NewcurrentDate, null, 0, 0, 0, 0, 0, 0, 0, 0,'M',
      '#MANUTENCAO', 0, 0, ocorrenceTypeID, note, 0, frontID, horimetro, usuarioID)

    // vamos inserir uma mensagem do tipo ocorrencia para que o embarcado receba a alteração de ocorrencia
    await RulesBusinessMessage.MessageInsert(EquipamentoID, "Equipamento liberado", NewcurrentDate, usuarioID, 5,
      frontID, null, null, 1, ocorrenceID, id)

    // vamos registrar a liberação do equipamento
    await RulesBusinessMaintenanceRelease.MaintenanceReleaseInsert(
     ControleHoraID,EquipamentoID, UsuarioMecanicoID, horimetro, operationId, id, ocorrenceID, usuarioID, NewcurrentDate
    )
    return 'ok'
     return controlTimeID
  }

}

module.exports = MaintenanceReleaseController
