const Model = use("Model");
const Database = use('Database')

const MaintenanceDetailing = use('App/Models/MaintenanceDetailing')

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

    const manutencaoDetalheID = await Database
    .insert({
      ControleHoraID: ControleHoraID.toString(),
      DataHora: DataHora,
      DataRegistro: DataRegistro,
      EquipamentoID: EquipamentoID,
      ManutencaoItenID: ManutencaoItenID,
      MecanicoID: UsuarioMecanicoID,
      MotivoManutencaoID: MotivoManutencaoID,
      Observacao: Observacao.toString(),
      OcorrenciaID: OcorrenciaID,
      //'OperacaoID': OperacaoID,
      OrdemManutencaoID: OrdemManutencaoID,
      UsuarioRegistroID: UsuarioRegistroID
      })
    .into('man.ManutencaoDetalhes')


  }

}

module.exports = RulesBusinessMaintenanceDetailing;
