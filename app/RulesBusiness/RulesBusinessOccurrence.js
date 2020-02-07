const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const EquipmentOperation = use('App/Models/EquipmentOperation')
const Database = use('Database')

class RulesBusinessOccurrence {

  // retorna a ocorrencia de acordo com a ocorrenciaID
  static async OccurrenceByID(ocorrenceID) {
    const ocorrence = await Database
      .select('dbo.Ocorrencias.OcorrenciaID','dbo.Ocorrencias.OcorrenciaTipoID')
      .from('dbo.Ocorrencias')
      .where({'dbo.Ocorrencias.OcorrenciaID': ocorrenceID})
    return  ocorrence
  }
  // retorna a ocorrencia de acordo com a ocorrenciaTipoID e equipamentoID
  static async OccurrenceByOccurenceTypeIDByEquipamentoID(ocorrenceTypeID, equipmentID) {
    const ocorrence = await Database
    .select('dbo.Ocorrencias.OcorrenciaID')
    .from('dbo.Ocorrencias')
    .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoTipoID', 'dbo.Ocorrencias.EquipamentoTipoID')
    .where({'dbo.Ocorrencias.OcorrenciaTipoID': ocorrenceTypeID})
    .where({'dbo.Equipamentos.EquipamentoID': equipmentID})
    return  ocorrence
  }

// SELECT
// O.OcorrenciaID, O.OcorrenciaTipoID
// FROM dbo.Ocorrencias AS O
// INNER JOIN dbo.Equipamentos AS E ON E.EquipamentoTipoID = O.EquipamentoTipoID
// WHERE O.OcorrenciaTipoID = -12
// AND E.EquipamentoID = 1

}

module.exports = RulesBusinessOccurrence;
