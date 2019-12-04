'use strict'

const UsuarioHook = exports = module.exports = {}
const Equipaments = use('App/Models/Equipamento')
const DefaultSyncMobile = use('App/Defaults/DefaultSyncMobile')

UsuarioHook.insertNewRecordSyncMobile = async (modelInstance) => {

  const equipments = await Equipaments.findAll()

  equipments.rows.map(async row => {
    DefaultSyncMobile.insertNewRecordSyncMobile(row.EquipamentoID,modelInstance.UsuarioID,'dbo.Usuarios','INSERT_USER', Env.get('SYNC_MOBILE_URL_USER'))
  })
console.log('Insert Sync Mobile OK!')
}

UsuarioHook.UpdateRecordSyncMobile = async (modelInstance) => {

  const equipments = await Equipaments.findAll()

  equipments.rows.map(async row => {
    DefaultSyncMobile.insertNewRecordSyncMobile(row.EquipamentoID,modelInstance.UsuarioID,'dbo.Usuarios','UPDATE_USER', Env.get('SYNC_MOBILE_URL_USER'))
  })
  console.log('Update Sync Mobile OK!')
}

UsuarioHook.DeleteRecordSyncMobile = async (modelInstance) => {

  const equipments = await Equipaments.findAll()

  equipments.rows.map(async row => {
    DefaultSyncMobile.insertNewRecordSyncMobile(row.EquipamentoID,modelInstance.UsuarioID,'dbo.Usuarios','DELETE_USER', Env.get('SYNC_MOBILE_URL_USER'))
  })
  console.log('Delete Sync Mobile OK!')
}
