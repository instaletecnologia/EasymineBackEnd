'use strict'

const EquipmentControlHour = use('App/Models/EquipmentControlHour')
const Database = use('Database')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const IdGenerator = use('App/Defaults/IdGenerator')

const RulesBusinessOccurrence = use('App/RulesBusiness/RulesBusinessOccurrence')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')
const RulesBusinessMaintenanceRelease = use('App/RulesBusiness/RulesBusinessMaintenanceRelease')

class EquipmentControlHourController {
  // Adiciona equipamento em manutenção
  async storeMaintenance ({ request, response, auth }) {

    const { EquipamentoID, OcorrenciaID, Horimetro, UsuarioID, Observacoes } = request.all()

    const horimetro = Horimetro.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.')

    //caso o parametro UsuarioID não tenha vamos vamos setar o com ADMIN
    const usuarioID =  UsuarioID
     if(!usuarioID) {
      usuarioID = auth.user.UsuarioID
     }

    //buscamos os dados da ocorrencia
    const ocorrence = await RulesBusinessOccurrence.OccurrenceByID(OcorrenciaID)
    if (ocorrence.length === 0) {
      return response.status(404).json({ message: "maintenance.error.release.WithoutOccurrence" })
    }

     //buscamos os dados de operacao
    // const equipmentOperation = await RulesBusinessEquipmentOperation.OperationGetLast(EquipamentoID)
    //return equipmentOperation

    //if (equipmentOperation.length === 0) {
    //  return response.status(404).json({ message: "maintenance.error.release.NoOperation" })
    // }

   // return equipmentOperation.length
    let FrenteID = 0
    let OperacaoID = 0

    // FrenteID = equipmentOperation[0].FrenteID
    // OperacaoID = equipmentOperation[0].OperacaoID

   //Se a ocorrencia estiver pra não permanecer na atividade vamos criar uma nova operacao sem atividade
   //if (ocorrence[0].PermanecerNaAtividade === false || ocorrence[0].PermanecerNaAtividade === null ) {

   //  FrenteID = 0
   //  //Vamos atualizar a ultima operacao e fechar a data fim o horimetro final
    const lastEquipmentOperation = await RulesBusinessEquipmentOperation.OperationUpdate(EquipamentoID, NewcurrentDate, usuarioID, horimetro)
    const newEquipmentOperation = await RulesBusinessEquipmentOperation.OperationInsert(EquipamentoID, FrenteID, usuarioID, Observacoes, horimetro, "M")
   if (newEquipmentOperation.length === 0) {
      return response.status(404).json({ message: "maintenance.error.add.NoCreateNewOperation" })
    }
    OperacaoID = newEquipmentOperation.OperacaoID
   //}ado

   //criamos o controlehoraID
    let id = IdGenerator.controlHour(EquipamentoID)
   // criamos o novo registro na tabela controlehoras
   const equipmentControlHour = await EquipmentControlHour.create({
     'ControleHoraID': id
     ,'EquipamentoID': EquipamentoID
     ,'OcorrenciaID': OcorrenciaID
     ,'OperacaoID': OperacaoID
     ,'DataHoraInicio': NewcurrentDate
     ,'Latitude': 0
     ,'Longitude': 0
     ,'Altitude': 0
     ,'DMT': 0
     ,'KmAtual': 0
     ,'Peso': 0
     ,'DentroDaCerca': 0
     ,'SensorID': 0
     ,'Valor': 'M'
     ,'ValorTipo': '#MANUTENCAO'
     ,'Horímetro': horimetro
     ,'Ok': 0
     ,'Cheio': 0
     ,'OcorrenciaTipoID': ocorrence[0].OcorrenciaTipoID
     ,'DataCadastro': NewcurrentDate
     ,'JustificativaID': 1
     ,'Obs': Observacoes
     ,'Logado': 0
     ,'FrenteID': FrenteID
     ,'HorimetroTelemetria': horimetro
     ,'CreationDate': NewcurrentDate
     ,'OperadorID': usuarioID
   });
    return equipmentControlHour
  }

  // Libera o equipamento para operacao
  async storeMaintenanceRelease ({ request, auth, response }) {

    const { ControleHoraID, EquipamentoID, Horimetro, UsuarioID, UsuarioMecanicoID, Observacoes } = request.all()

    const horimetro = Horimetro.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.')

   //Pegamos a data atual do servidor
   const dateNow = NewcurrentDate

    //caso o parametro UsuarioID não tenha vamos vamos setar o com ADMIN
    const usuarioID =  UsuarioID
     if(!usuarioID) {
      usuarioID = auth.user.UsuarioID
     }

    //buscamos pelo tipo de ocorrencia -12 Equipamento entregue prar Operação
    let OcorrenciaTipoID = -12
    let OcorrenciaID = 11
    // const ocorrence = await RulesBusinessOccurrence.OccurrenceByOccurenceTypeIDByEquipamentoID(OcorrenciaTipoID, EquipamentoID)

    // if (ocorrence.length === 0) {
    //   // a message está traduzida no projeto frontEnd (Não existe ocorrência do tipo Equipamento liberado cadastrada para o tipo deste equipamento!)
    // return response.status(404).json({ message: "maintenance.error.release.WithoutOccurrence" })
//
    //}

     //buscamos os dados de operacao
   // const equipmentOperation = await RulesBusinessEquipmentOperation.OperationGetLast(EquipamentoID)

  //  if (equipmentOperation.length === 0) {
  //    // a message está traduzida no projeto frontEnd (Não existe operação para o equipamento!)
  //  return response.status(404).json({ message: "maintenance.error.release.NoOperation" })
//
  // }

    let FrenteID = 0
    let OperacaoID = 0

  //  FrenteID = equipmentOperation[0].FrenteID
  //  OperacaoID = equipmentOperation[0].OperacaoID
//
  // //Se a ocorrencia estiver pra não permanecer na atividade vamos criar uma nova operacao sem atividade
  // if (ocorrence[0].PermanecerNaAtividade === false || ocorrence[0].PermanecerNaAtividade === null ) {
  //   FrenteID = 0
  //   //Vamos atualizar a ultima operacao e fechar a data fim o horimetro final
  //   await EquipmentOperation .OperationUpdate(EquipamentoID, dateNow, usuarioID, horimetro)
  //   const newEquipmentOperation = await RulesBusinessEquipmentOperation.OperationInsert(EquipamentoID, FrenteID, usuarioID, Observacoes, horimetro, "M")
  //   OperacaoID = newEquipmentOperation[0].OperacaoID
  // }

   //criamos o controlehoraID
     let id = IdGenerator.controlHour(EquipamentoID)
   // criamos o novo registro na tabela controlehoras
   const equipmentControlHour = await EquipmentControlHour.create({
   'ControleHoraID': id
   ,'EquipamentoID': EquipamentoID
   ,'OcorrenciaID': OcorrenciaID
   ,'OperacaoID': OperacaoID
   ,'DataHoraInicio': dateNow
   ,'Latitude': 0
   ,'Longitude': 0
   ,'Altitude': 0
   ,'DMT': 0
   ,'KmAtual': 0
   ,'Peso': 0
   ,'DentroDaCerca': 0
   ,'SensorID': 0
   ,'Valor': 'M'
   ,'ValorTipo': '#MANUTENCAO'
   ,'Horímetro': horimetro
   ,'Ok': 0
   ,'Cheio': 0
   ,'OcorrenciaTipoID': OcorrenciaTipoID
   ,'DataCadastro': dateNow
   ,'JustificativaID': 1
   ,'Obs': Observacoes
   ,'Logado': 0
   ,'FrenteID': FrenteID
   ,'HorimetroTelemetria': horimetro
   ,'CreationDate': dateNow
   ,'OperadorID': usuarioID
 });

 // vamos registrar a liberação do equipamento
 await RulesBusinessMaintenanceRelease.MaintenanceReleaseInsert(
  UsuarioMecanicoID,
  horimetro,
  OperacaoID,
  OperacaoID,
  ControleHoraID,
  equipmentControlHour.ControleHoraID,
  OcorrenciaID,
  equipmentControlHour.OcorrenciaID,
  usuarioID,
  dateNow
  )

  return equipmentControlHour
  }

}

module.exports = EquipmentControlHourController
