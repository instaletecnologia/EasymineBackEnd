const Model = use("Model");

const Database = use('Database')

class RulesBusinessOccurrence {

  // retorna a ocorrencia de acordo com a ocorrenciaID
  static async OccurrenceByID(ocorrenceID) {
    const ocorrence = await Database
      .select('dbo.Ocorrencias.OcorrenciaID',
      'dbo.Ocorrencias.OcorrenciaTipoID',
      'dbo.Ocorrencias.PermanecerNaAtividade',
      'dbo.Ocorrencias.idCategoriasTempo' )
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

  static async OcorrenceByMaintenanceType(maintenanceType, equipmentId) {
    const query = await Database
    .select('dbo.Ocorrencias.OcorrenciaID', 'dbo.OcorrenciasTipos.Descricao')
    .from('dbo.OcorrenciasTipos')
    .innerJoin('dbo.Ocorrencias', 'dbo.OcorrenciasTipos.OcorrenciaTipoID', 'dbo.Ocorrencias.OcorrenciaTipoID')
    .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoTipoID', 'dbo.Ocorrencias.EquipamentoTipoID')
    .innerJoin('dbo.CategoriasTempo', 'dbo.CategoriasTempo.idCategoriasTempo', 'dbo.Ocorrencias.idCategoriasTempo')
    .where({ 'dbo.Ocorrencias.Ativo': true })
    .where({ 'dbo.Ocorrencias.Acao': 'M' })
    .where({'dbo.Equipamentos.EquipamentoID': equipmentId})
    .where({'dbo.CategoriasTempo.idCategoriasTempo': maintenanceType})
    .orWhere({'dbo.CategoriasTempo.ParentID': maintenanceType})
    .groupByRaw('dbo.Ocorrencias.OcorrenciaID, dbo.OcorrenciasTipos.Descricao')
    .orderBy('dbo.OcorrenciasTipos.Descricao')
    return query
  }

}

module.exports = RulesBusinessOccurrence;
