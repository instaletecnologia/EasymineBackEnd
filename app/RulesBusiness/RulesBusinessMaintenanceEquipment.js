const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const EquipmentOperation = use('App/Models/EquipmentOperation')
const IdGenerator = use('App/Defaults/IdGenerator')

const Database = use('Database')

class RulesBusinessMaintenanceEquipment {

  // função para inserir uma nova manutenção pro equipamento
  static async MaintenanceEquipmentInsert(equipmentID, date, controltimeID, operationID, note, creationDate, userID) {

    const MaintenanceEquipment = use('App/Models/MaintenanceEquipment')
    const maintenanceEquipment = await MaintenanceEquipment.create({
      'EquipamentoID': equipmentID
      ,'Data': date
      ,'ControleHoraID': controltimeID
      ,'OperacaoID': operationID
      ,'Observacoes': note
      ,'DataRegistro': creationDate
      ,'UsuarioRegistroID': userID
    })

       return maintenanceEquipment
  }

  // função responsavel por efetuar o fechamento da ultiam manutencao pro equipamento
  static async MaintenanceEquipmenUpdate(equipmentID, date, userID) {
    const maintenanceEquipment = await Database
    .table('man.EquipamentosManutencoes')
    .where({'man.EquipamentosManutencoes.DataLiberacao': null})
    .where({'man.EquipamentosManutencoes.EquipamentoID': equipmentID})
    .update({ DataLiberacao: date,
      DataAlteracao: date,
      UsuarioAtualizaID: userID})

    return maintenanceEquipment
  }

}

module.exports = RulesBusinessMaintenanceEquipment;
