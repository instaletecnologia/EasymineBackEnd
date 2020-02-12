const Model = use("Model");
const MaintenanceDetailing = use('App/Models/MaintenanceDetailing')

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate();

const Database = use('Database')

class RulesBusinessMaintenanceDetailing {

  static async MaintenanceDetailingInsert(
    ManutencaoItenID,
    UsuarioMecanicoID,
    DataHora,
    Observacao,
    EquipamentoID,
    ControleHoraID,
    OperacaoID,
    OcorrenciaID,
    UsuarioRegistroID,
    DataRegistro,
    OrdemManutencaoID,
    MotivoManutencaoID,
  ) {

    const manutencaoDetalheID = await MaintenanceDetailing.create({
      'ControleHoraID': ControleHoraID,
      'DataHora': DataHora,
      'DataRegistro': DataRegistro,
      'EquipamentoID': EquipamentoID,
      'ManutencaoItenID': ManutencaoItenID,
      'MecanicoID': UsuarioMecanicoID,
      'MotivoManutencaoID': MotivoManutencaoID,
      'Observacao': Observacao,
      'OcorrenciaID': OcorrenciaID,
     // 'OperacaoID': OperacaoID,
      'OrdemManutencaoID': OrdemManutencaoID,
      'UsuarioRegistroID': UsuarioRegistroID
    })

   return manutencaoDetalheID
  }

}

module.exports = RulesBusinessMaintenanceDetailing;
