'use strict'

const FailureClassTimeCategory = use('App/Models/ClassesFalhasCategoriasTempo')
const Database = use('Database')

class OccurrenceController {

  async indexOcorrenceByMaintenanceType ({ params }) {
    const query = await Database
    .select('man.ClassesFalhas.ClasseFalhaID','man.ClassesFalhas.Descricao')
    .from('dbo.Ocorrencias')
    .innerJoin('dbo.OcorrenciasTipos', 'dbo.OcorrenciasTipos.OcorrenciaTipoID', 'dbo.Ocorrencias.OcorrenciaTipoID')
    .where({ 'dbo.Ocorrencias.Ativo': true })
    .where({'dbo.Ocorrencias.idCategoriasTempo': params.idCategoriasTempo})
    .where({'dbo.Ocorrencias.EquipamentoTipoID': params.EquipamentoTipoID})
    .orderBy('dbo.OcorrenciasTipos.Descricao', 'desc')

    return query
  }

}

module.exports = OccurrenceController
