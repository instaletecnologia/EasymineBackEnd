const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const Database = use('Database')

class RulesBusinessMaintenanceOrder {


  static async MaintenanceOrdersByEquipmentIDByCategoryTimeID() {

    const orders = await Database
        .select('man.OrdensManutencoes.OrdemManutencaoID', 'man.OrdensManutencoes.NumeroOrdem')
        .from('man.OrdensManutencoes')
        .where({'man.OrdensManutencoes.EquipamentoID': true})
        .where({'man.OrdensManutencoes.CategoriaID': true})
        .orderBy('NumeroOrdem','desc')

   return orders
  }

}

module.exports = RulesBusinessMaintenanceOrder;
