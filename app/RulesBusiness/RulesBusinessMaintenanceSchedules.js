const Model = use("Model");

const Database = use('Database')

const RulesBusinessMaintenanceSchedulesHistory = use('App/RulesBusiness/RulesBusinessMaintenanceSchedulesHistory')


class RulesBusinessMaintenanceSchedules {

  // retorna todos os usuario ativos no sistema:
  static async MaintenanceSchedulesInsert(idCategoriasTempo, parentID, equipmentID, dateStart, order value, userID, note, dateCreation) {

      let serviceMaintenanceID = 0
			//SE FOR PARENT(6) OU CATEGORIA DE TEMPO(6) DE MANUTENCAO PREVENTIVA  -- HMP HORAS MANUTENÇÃO PREVENTIVA
			if (idCategoriasTempo === 6 || parentID === 6) {
        serviceMaintenanceID = 3
      }
			//SE FOR PARENT(7) OU CATEGORIA DE TEMPO(7) DE MANUTENCAO CORRETIVA  -- HMP HORAS MANUTENÇÃO CORRETIVA
      if (idCategoriasTempo === 7 || parentID === 7) {
        serviceMaintenanceID = 1
      }
        let dateEnd = DATEADD(hour,48,dateStart)
				let status = 'I'
				let descriptopnService =value
				// VERIFICA O VALORTIPO SENDO INDICADO PELO EMBARCADO DESSA FORMA ALTERA O VALOR PARA APRESENTAR
				// NA GRADE DE PROGRAMAÇÕES DA CENTRAL DE SOLICITAÇÕES - RAFAEL XAVIER - 16/09/2019
				if (descriptopnService === null || descriptopnService = '') {
          descriptopnService = '#EMBARCADO'
        }

         const maintenanceSchedulesID = await Database
            .insert({
              	ServicoManutencaoID: serviceMaintenanceID,
							  EquipamentoID: equipmentID,
							  DescricaoServicos: descriptopnService,
							  DataInicio: dateStart,
							  DataFim: dateEnd,
							  NumeroOrdem: order
							  DataRegistro: dateCreation
							  UsuarioRegistroID: userID
							  Observacoes: note
							  Status: status
              })
            .into('man.ManutencaoProgramacoes')

            const maintenanceSchedulesHistoryID = await RulesBusinessMaintenanceSchedulesHistory
            .MaintenanceSchedulesHistoryInsert(
              maintenanceSchedulesID,
				      status,
				      dateStart,
				      note,
				      dateCreation,
				      userID
            )

    return maintenanceSchedulesID
  }

}

module.exports = RulesBusinessMaintenanceSchedules;
