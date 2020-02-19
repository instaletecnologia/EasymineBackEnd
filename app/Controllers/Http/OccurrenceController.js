'use strict'

const Database = use('Database')

const RulesBusinessOccurrence = use('App/RulesBusiness/RulesBusinessOccurrence')

class OccurrenceController {

  async indexOcorrenceByMaintenanceType ({ request }) {

    const { maintenanceType, equipmentId } = request.all()

    const result = await RulesBusinessOccurrence.OcorrenceByMaintenanceType(maintenanceType, equipmentId)

    return result
  }

}

module.exports = OccurrenceController
