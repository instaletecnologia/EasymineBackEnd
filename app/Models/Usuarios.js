'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Usuarios extends Model {

  static get table () {
    return 'dbo.Usuarios'
  }

  static get primaryKey () {
    return 'UsuarioID'
  }

  static get incrementing () {
    return true
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }


  static get visible(){
    return [
      'Ativo',
      'Chapa',
      'CreationDate',
      'DataAtualizacao',
      'DataCadastro',
      'Email',
      'Input',
      'LastEditDate',
      'Login',
      'Nome',
      'Senha',
      'TipoLogin',
      'UsuarioID',
      'UsuarioAtualizaID',
      'UsuarioPermissaoID',
      'UsuarioRegistroID',
      'UsuarioSetorID',
      'token',
      'token_created_at'
    ]
  }

   static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.Senha) {
        userInstance.Senha = await Hash.make(userInstance.Senha)
      }
    })


      this.addHook('afterCreate', 'UsuarioHook.insertNewRecordSyncMobile')
      this.addHook('afterUpdate', 'UsuarioHook.UpdateRecordSyncMobile')
      this.addHook('afterDelete', 'UsuarioHook.DeleteRecordSyncMobile')

  }

  tokens () {
    return this.hasMany('App/Models/Token')
 }
}

module.exports = Usuarios
