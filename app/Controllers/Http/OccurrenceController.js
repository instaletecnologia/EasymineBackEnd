'use strict'

const FailureClassTimeCategory = use('App/Models/ClassesFalhasCategoriasTempo')
const Database = use('Database')

class OccurrenceController {

  async indexOcorrenceByMaintenanceType ({ request }) {

    const { maintenanceType, equipmentId } = request.all()

    const query = await Database
    .distinct('dbo.OcorrenciasTipos.Descricao')
    .select('dbo.Ocorrencias.OcorrenciaID', 'dbo.OcorrenciasTipos.Descricao')
    .from('dbo.Ocorrencias')
    .innerJoin('dbo.OcorrenciasTipos', 'dbo.OcorrenciasTipos.OcorrenciaTipoID', 'dbo.Ocorrencias.OcorrenciaTipoID')
    .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoTipoID', 'dbo.Ocorrencias.EquipamentoTipoID')
    .innerJoin('dbo.CategoriasTempo', 'dbo.CategoriasTempo.idCategoriasTempo', 'dbo.Ocorrencias.idCategoriasTempo')
    .where({ 'dbo.Ocorrencias.Ativo': true })
    .where({'dbo.Equipamentos.EquipamentoID': equipmentId})
    .where({'dbo.CategoriasTempo.idCategoriasTempo': maintenanceType})
    .orWhere({'dbo.CategoriasTempo.ParentID': maintenanceType})

    return query
  }

}

module.exports = OccurrenceController
