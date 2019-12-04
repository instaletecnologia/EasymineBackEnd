'use strict'

const EquipamentoHook = exports = module.exports = {}
const DefaultSyncMobile = use('App/Defaults/DefaultSyncMobile')

EquipamentoHook.insertNewRecordSyncMobile = async (modelInstance) => {
  DefaultSyncMobile.
  insertNewRecordSyncMobile(modelInstance.EquipamentoID,modelInstance.EquipamentoID,'dbo.Equipamentos','UPDATE_EQUIPMENT')
}
