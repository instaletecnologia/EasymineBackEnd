const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const EquipmentControlHour = use('App/Models/EquipmentControlHour')

const Database = use('Database')

class RulesBusinessEquipmentControlHour {
//Função faz insert na controlehoras porem vamos ter que utilizar a procedure utilizada para inserir na controlehoras
static async EquipmentControlHourInsert( controlTimeID,equipmentID,ocorrenceID,operationID,dateStart,
  dateEnd,latitude,longitude,altitude,dmt,currentKm,weight,InsideTheFence,SensorID,value,valueType,
  ok,full,ocorrenceTypeID,note,logged,frontID,horimeter,userID) {

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
        .select('dbo.ControleHoras.ControleHoraID','dbo.ControleHoras.OperacaoID', 'dbo.ControleHoras.OcorrenciaID')
        .from('dbo.ControleHoras')
        .where({'dbo.ControleHoras.EquipamentoID': equipmentID})
        .limit(1)
        .orderBy('dbo.ControleHoras.DataHoraInicio', 'desc')

        return operation
  }

}

module.exports = RulesBusinessEquipmentControlHour;
