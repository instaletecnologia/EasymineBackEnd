'use strict'

const UsuarioHook = exports = module.exports = {}
const Equipaments = use('App/Models/Equipamento')
const DefaultSyncMobile = use('App/Defaults/DefaultSyncMobile')

UsuarioHook.insertNewRecordSyncMobile = async (modelInstance) => {
console.log('Insert Sync Mobile OK!')
}

UsuarioHook.UpdateRecordSyncMobile = async (modelInstance) => {
  console.log('Update Sync Mobile OK!')
}

UsuarioHook.DeleteRecordSyncMobile = async (modelInstance) => {
  console.log('Delete Sync Mobile OK!')
}
