const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const EquipmentOperation = use('App/Models/EquipmentOperation')
const IdGenerator = use('App/Defaults/IdGenerator')

const Database = use('Database')

class RulesBusinessEquipmentOperation {

  // função para inserir uma nova operação
  static async OperationInsert(id, equipmentID, dateStart, frontID, userID, note, horimeter,source, operationLastID) {

    //Vamos finalizar a ultima operacao do equipamento
    await RulesBusinessEquipmentOperation.OperationUpdate(operationLastID, dateStart, userID, horimeter)

    const equipmentOperationId = await Database
    .insert({
       OperacaoID: id
      ,FrenteID: frontID
      ,EquipamentoID: equipmentID
      ,DataCadastro: dateStart
      ,HorimetroInicial:horimeter
      ,HorimetroFinal: horimeter
      ,KmInicial: 0
      ,KmFinal: 0
      ,DMT: 0
      ,DataInicio: dateStart
      ,Origem: source
      ,DataRegistro: dateStart
      ,CreationDate: dateStart
      ,Obs: note.toString()
      ,UsuarioRegistroID: userID
      })
    .into('dbo.Operacoes')

   return id
  }

  // função responsavel por efetuar o fechamento da ultiam operacao
  static async OperationUpdate(operationID, dateEnd, userID, horimeterEnd) {
      const oquipmentOperation = await Database
      .table('dbo.Operacoes')
      .where({'dbo.Operacoes.OperacaoID': operationID})
      .update({ DataFim: dateEnd, UsuarioAtualizaID: userID, HorimetroFinal: horimeterEnd })

    // return oquipmentOperation
  }

  // função responsavel por retornar a ultima operacao do equipamento
  static async OperationGetLast(equipmentID){
       const operation = await Database
        .select('dbo.Operacoes.OperacaoID','dbo.Operacoes.FrenteID')
        .from('dbo.Operacoes')
        .where({'dbo.Operacoes.EquipamentoID': equipmentID})
        .limit(1)
        .orderBy('DataInicio', 'desc')

        return operation
  }
}

module.exports = RulesBusinessEquipmentOperation;
