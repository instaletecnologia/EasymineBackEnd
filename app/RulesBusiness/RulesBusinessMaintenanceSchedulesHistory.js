const Model = use("Model");

const Database = use('Database')

class RulesBusinessMaintenanceSchedulesHistory {

  // retorna todos os usuario ativos no sistema:
  static async MaintenanceSchedulesHistoryInsert(
        maintenanceSchedulesID,
				maintenanceSchedulesStatusID,
				dateStart,
				note,
				dateCreation,
				userID) {
    const MaintenanceSchedulesHistoryID = await Database
      .insert({
    		ManutencaoProgramacaoID: maintenanceSchedulesID,
				ManutencaoProgramacaoStatusID: maintenanceSchedulesStatusID,
				Data: dateStart
				Observacoes: note
				DataRegistro: dateCreation
				UsuarioRegistroID: userID
				Ativo: true
      })
    .into('man.ManutencaoProgramacoesHistoricos')

    return MaintenanceSchedulesHistoryID
  }

}

module.exports = RulesBusinessMaintenanceSchedulesHistory;
