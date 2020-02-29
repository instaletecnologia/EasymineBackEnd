const Model = use("Model");
const moment = require("moment");
const _ = require("lodash");

const Formats = use('Antl/Formats')

const EquipmentControlHour = use('App/Models/EquipmentControlHour')

const Database = use('Database')

class RulesBusinessEquipmentControlHour {
//Função faz insert na controlehoras porem vamos ter que utilizar a procedure utilizada para inserir na controlehoras
static async EquipmentControlHourInsert( controlTimeID,equipmentID,ocorrenceID,operationID,dateStart,
  dateEnd,latitude,longitude,altitude,dmt,currentKm,weight,InsideTheFence,SensorID,value,valueType,
  ok,full,ocorrenceTypeID,note,logged,frontID,horimeter,userID) {

  // vamos atualizar a ultima linha da controlehoras
  const controlHourLast = await RulesBusinessEquipmentControlHour.EquipmentoControlHourGetLast(equipmentID)
  if (!_.isEmpty(controlHourLast)) {
    const controlHourLastID = _.get(_.first(controlHourLast), 'ControleHoraID')
    await RulesBusinessEquipmentControlHour.EquipmentControlHourUpdate(controlHourLastID, equipmentID, dateStart, userID)
  }

   // criamos o novo registro na tabela controlehoras
    const userId = await Database
    .insert({
      ControleHoraID: controlTimeID
     ,EquipamentoID: equipmentID
     ,OcorrenciaID: ocorrenceID
     ,OperacaoID: operationID
     ,DataHoraInicio: dateStart
     ,DataHoraTermino: dateEnd
     ,Latitude: latitude
     ,Longitude: longitude
     ,Altitude: altitude
     ,DMT: dmt
     ,KmAtual: currentKm
     ,Peso: weight
     ,DentroDaCerca: InsideTheFence
     ,SensorID: SensorID
     ,Valor: value
     ,ValorTipo: valueType
     ,Horímetro: horimeter
     ,Ok: ok
     ,Cheio: full
     ,OcorrenciaTipoID: ocorrenceTypeID
     ,DataCadastro: dateStart
     ,JustificativaID: 1
     ,Obs: note
     ,Logado: logged
     ,FrenteID: frontID
     ,HorimetroTelemetria: horimeter
     ,CreationDate: dateStart
     ,OperadorID: userID
      })
    .into('dbo.ControleHoras')


}

  static async EquipmentControlHourUpdate(controlTimeID, equipmentID, dateEnd, userID) {
    const resultUpdate = await Database
     .table('dbo.ControleHoras')
      .where({'dbo.ControleHoras.ControleHoraID': controlTimeID.toString()})
      .update({ DataHoraTermino: dateEnd, DataAlteracao: dateEnd, UsuarioAtualizaID: userID })

     return equipmentID
  }

// função responsavel por retornar a ultima operacao do equipamento
  static async EquipmentoControlHourGetLast(equipmentID)
  {
       const operation = await Database
        .select('dbo.ControleHoras.ControleHoraID','dbo.ControleHoras.OperacaoID', 'dbo.ControleHoras.OcorrenciaID')
        .from('dbo.ControleHoras')
        .where({'dbo.ControleHoras.EquipamentoID': equipmentID})
        .limit(1)
        .orderBy('dbo.ControleHoras.DataHoraInicio', 'desc')

        return operation
  }

// função responsavel por retornar o registro de acordo com o controlehoraID
  static async EquipmentoControlHourGetID(controlTimeID)
  {
       const operation = await Database
        .select('dbo.ControleHoras.ControleHoraID','dbo.ControleHoras.OperacaoID', 'dbo.ControleHoras.OcorrenciaID', 'dbo.ControleHoras.DataHoraInicio')
        .from('dbo.ControleHoras')
        .where({'dbo.ControleHoras.ControleHoraID': controlTimeID.toString()})

        return operation
  }

}

module.exports = RulesBusinessEquipmentControlHour;
