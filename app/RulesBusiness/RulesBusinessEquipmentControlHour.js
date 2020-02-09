const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const EquipmentControlHour = use('App/Models/EquipmentControlHour')

const Database = use('Database')

class RulesBusinessEquipmentControlHour {

// função para inserir uma nova manutenção pro equipamento
static async EquipmentControlHourInsert( controlTimeID,equipmentID,ocorrenceID,operationID,dateStart,
  dateEnd,latitude,longitude,altitude,dmt,currentKm,weight,InsideTheFence,SensorID,value,valueType,
  ok,full,ocorrenceTypeID,note,logged,frontID,horimeter,userID) {

    const NewcurrentDate = Defaults.currentDate()
     // criamos o novo registro na tabela controlehoras
  const equipmentControlHour = await EquipmentControlHour.create({
     'ControleHoraID': controlTimeID
     ,'EquipamentoID': equipmentID
     ,'OcorrenciaID': ocorrenceID
     ,'OperacaoID': operationID
     ,'DataHoraInicio': dateStart
     ,'DataHoraTermino': dateEnd
     ,'Latitude': latitude
     ,'Longitude': longitude
     ,'Altitude': altitude
     ,'DMT': dmt
     ,'KmAtual': currentKm
     ,'Peso': weight
     ,'DentroDaCerca': InsideTheFence
     ,'SensorID': SensorID
     ,'Valor': value
     ,'ValorTipo': valueType
     ,'Horímetro': horimeter
     ,'Ok': ok
     ,'Cheio': full
     ,'OcorrenciaTipoID': ocorrenceTypeID
     ,'DataCadastro': NewcurrentDate
     ,'JustificativaID': 1
     ,'Obs': note
     ,'Logado': logged
     ,'FrenteID': frontID
     ,'HorimetroTelemetria': horimeter
     ,'CreationDate': NewcurrentDate
     ,'OperadorID': userID
   });
    return equipmentControlHour
}

static async EquipmentControlHourUpdate(controlTimeID, equipmentID, dateEnd, UserID) {
      const oquipmentOperation = await Database
      .table('dbo.ControleHoras')
      .where({'ControleHoraID': controlTimeID})
      .where({'EquipamentoID': equipmentID})
      .update({ DataHoraTermino: dateEnd, DataAlteracao: dateEnd, LastEditDate: dateEnd, UsuarioAtualizaID: UserID })

    return oquipmentOperation
}

// função responsavel por retornar a ultima operacao do equipamento
  static async EquipmentoControlHourGetLast(equipmentID){
       const operation = await Database
        .select('ControleHoraID','OperacaoID')
        .from('dbo.ControleHoras')
        .where({'EquipamentoID': equipmentID})
        .limit(1)
        .orderBy('DataHoraInicio', 'desc')

        return operation
  }

}

module.exports = RulesBusinessEquipmentControlHour;
