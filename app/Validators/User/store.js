'use strict'

const Antl = use('Antl')

class UserStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required:dbo.Usuarios, Nome',
      plate: 'required|unique:dbo.Usuarios, Chapa',
      // email: 'required|unique|email:dbo.Usuarios, Email',
      password: 'required:dbo.Usuarios, Senha',
      userSectorID: 'required:dbo.Usuarios, UsuarioSetorID',
      userPermissionID: 'required:dbo.Usuarios, UsuarioPermissaoID',
      login: 'required|unique:dbo.Usuarios, Login',
      loginType: 'required:dbo.Usuarios, TipoLogin',
      input: 'required:dbo.Usuarios, Input',
    }
  }

  get messages () {
    return Antl.list('validation')
 }
}

module.exports = UserStore
