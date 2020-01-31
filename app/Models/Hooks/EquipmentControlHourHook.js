'use strict'

const Database = use('Database')
const RulesBusinessMaintenanceEquipment = use('App/RulesBusiness/RulesBusinessMaintenanceEquipment')
const EquipmentControlHourHook = exports = module.exports = {}

// Quando for adicionado um novo registro na controlehoras ID com #MANUTENCAO
//Inseri na tabela man.EquipamentoManutencoes
EquipmentControlHourHook.insertMaintenanceEquipment = async (modelInstance) => {

  // adiciona o equipamento e equipamentos manutenção
  if(modelInstance.ValorTipo === '#MANUTENCAO' && modelInstance.OcorrenciaTipoID != -12) {
     await RulesBusinessMaintenanceEquipment.MaintenanceEquipmentInsert(
      modelInstance.EquipamentoID,
      modelInstance.DataHoraInicio,
      modelInstance.ControleHoraID,
      modelInstance.OperacaoID,
      modelInstance.Obs,
      modelInstance.CreationDate,
      modelInstance.OperadorID);
  }
  // quando for efetuado a liberação do equipamentos vamos finalizar a manutencao existente para o equipamento
  if(modelInstance.ValorTipo === '#MANUTENCAO' && modelInstance.OcorrenciaTipoID === -12) {
    // atualiza a tabela equipamentos manutencoes
    await RulesBusinessMaintenanceEquipment.MaintenanceEquipmenUpdate(
      modelInstance.EquipamentoID,
      modelInstance.DataHoraInicio,
      modelInstance.OperadorID);
  }

}
