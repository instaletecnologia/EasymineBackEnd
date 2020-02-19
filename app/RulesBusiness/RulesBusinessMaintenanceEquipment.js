const Model = use("Model");
const MaintenanceEquipment = use('App/Models/MaintenanceEquipment')

const Database = use('Database')

class RulesBusinessMaintenanceEquipment {

    // função para inserir uma nova manutenção pro equipamento
  static async MaintenanceEquipmentInsert(equipmentID, date, controltimeID, operationID, note, creationDate, userID) {
    // Como tratamento vamos finalizar todos as linhas que não foram fechadas por algum motivo desonhecido na tabela
      await RulesBusinessMaintenanceEquipment.MaintenanceEquipmenUpdate(equipmentID, date, userID)

       const maintenanceEquipment = await Database
        .insert({
           EquipamentoID: equipmentID
          ,Data: date
          ,ControleHoraID: controltimeID
          ,OperacaoID: operationID
          ,Observacoes: note
          ,DataRegistro: creationDate
          ,UsuarioRegistroID: userID
          })
        .into('man.EquipamentosManutencoes')

       //return equipmentID
  }

  // função responsavel por efetuar o fechamento da ultiam manutencao pro equipamento
  static async MaintenanceEquipmenUpdate(equipmentID, date, userID) {

    const resultUpdate = await Database
      .table('man.EquipamentosManutencoes')
      .where({'man.EquipamentosManutencoes.DataLiberacao': null})
      .where({'man.EquipamentosManutencoes.EquipamentoID': equipmentID})
      .update({ DataLiberacao: date, DataAlteracao: date, UsuarioAtualizaID: userID })

     return equipmentID
  }


}

module.exports = RulesBusinessMaintenanceEquipment;
