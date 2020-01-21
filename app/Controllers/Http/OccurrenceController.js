'use strict'

const FailureClassTimeCategory = use('App/Models/ClassesFalhasCategoriasTempo')
const Database = use('Database')

class OccurrenceController {

  async indexOcorrenceByMaintenanceType ({ request }) {

    const { maintenanceType, equipmentId } = request.all()

    const query = await Database
    .select('dbo.Ocorrencias.OcorrenciaID', 'dbo.OcorrenciasTipos.Descricao')
    .from('dbo.Ocorrencias')
    .innerJoin('dbo.OcorrenciasTipos', 'dbo.OcorrenciasTipos.OcorrenciaTipoID', 'dbo.Ocorrencias.OcorrenciaTipoID')
    .where({ 'dbo.Ocorrencias.Ativo': true })

    return query
  }

}

module.exports = OccurrenceController
