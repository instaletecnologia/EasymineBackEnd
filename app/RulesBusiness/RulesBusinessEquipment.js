const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const EquipmentOperation = use('App/Models/EquipmentOperation')
const IdGenerator = use('App/Defaults/IdGenerator')

const Database = use('Database')
const Equipment = use('App/Models/Equipamento')

class RulesBusinessEquipment {

  // função para inserir uma nova operacao pro equipamento
  static async OperationInsert(equipmentID, frontID, userID, note, horimeter,source) {
    const id = IdGenerator.operation(equipmentID)

    if (frontID === undefined) {
      frontID = 0
    }
      const equipmentOperation = await EquipmentOperation.create({
       'OperacaoID': id
      ,'FrenteID': frontID
      ,'EquipamentoID': equipmentID
      ,'DataCadastro': NewcurrentDate
      ,'HorimetroInicial':horimeter
      ,'HorimetroFinal': horimeter
      ,'KmInicial': 0
      ,'KmFinal': 0
      ,'DMT': 0
      ,'DataInicio': NewcurrentDate
      ,'Origem': source
      ,'DataRegistro': NewcurrentDate
      ,'CreationDate': NewcurrentDate
      ,'Obs': note.toString()
      ,'UsuarioRegistroID': userID
      })

       return id
  }
  // função responsavel por efetuar o fechamento da ultiam operacao
  static async OperationUpdate(operationID, dateEnd, userID, horimeterEnd) {
      const oquipmentOperation = await Database
      .table('dbo.Operacoes')
      .where({'dbo.Operacoes.OperacaoID': operationID})
      .update({ DataFim: dateEnd, UsuarioAtualizaID: userID, HorimetroFinal: horimeterEnd })

    return oquipmentOperation
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

  // função retorna todos os equipamentos que estão ativos e possuem alocação.
  static async EquipmentGetAcitive() {

    const equipments = await Database
        .select('dbo.Equipamentos.EquipamentoID',
        'dbo.Equipamentos.EquipamentoTipoID',
        'dbo.Equipamentos.TagPrefixo',
        'dbo.Equipamentos.TagNumero',
        'dbo.Equipamentos.Ativo')
        .from('dbo.Operacoes')
        .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoID', 'dbo.Equipamentos.EquipamentoID')
        .where({'dbo.Operacoes.DataFim': null})
        .where({'dbo.Equipamentos.Ativo': true})
        .orderBy('dbo.Equipamentos.TagPrefixo', 'dbo.Equipamentos.TagNumero', 'desc')
        .groupByRaw('dbo.Equipamentos.EquipamentoID , dbo.Equipamentos.EquipamentoTipoID , dbo.Equipamentos.TagPrefixo, dbo.Equipamentos.TagNumero, dbo.Equipamentos.Ativo')

   return equipments
  }

  // função retorna todos os equipamentos que nao estão em manutenção que estão ativos e devem estar alocados
  static async EquipmentGetAcitiveNoInMaintenance() {
    const subquery = Database
      .select('EquipamentoID')
      .from('man.EquipamentosManutencoes')
      .where({'DataLiberacao': null})

    const equipments = await Database
        .select('dbo.Equipamentos.EquipamentoID',
        'dbo.Equipamentos.EquipamentoTipoID',
        'dbo.Equipamentos.TagPrefixo',
        'dbo.Equipamentos.TagNumero',
        'dbo.Equipamentos.Ativo')
        .from('dbo.Operacoes')
        .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoID', 'dbo.Operacoes.EquipamentoID')
        .where({'dbo.Operacoes.DataFim': null})
        .where({'dbo.Equipamentos.Ativo': true})
        .whereNotIn('dbo.Equipamentos.EquipamentoID', subquery)
        .orderBy('dbo.Equipamentos.TagPrefixo', 'dbo.Equipamentos.TagNumero', 'desc')
        .groupByRaw('dbo.Equipamentos.EquipamentoID , dbo.Equipamentos.EquipamentoTipoID , dbo.Equipamentos.TagPrefixo, dbo.Equipamentos.TagNumero, dbo.Equipamentos.Ativo')


   return equipments
  }
}

module.exports = RulesBusinessEquipment;
