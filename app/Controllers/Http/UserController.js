'use strict'

const User = use("App/Models/Usuarios")
const Defaults = use('App/Defaults/Dates')

class UserController {

  async index({ request }){
    let { page, perPage } = request.all()

    const user = User.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return user
  }

  async indexSelectMechanical ({ request, response, view }) {
    const users = await User.query()
    .select('UsuarioID','Nome')
    .where('Ativo', true)
    .where('UsuarioPermissaoID', 15)
    .orderBy('Nome')
    .fetch()

    return users
  }

  async indexActive ({ request, response, view }) {
    const users = await User.query()
    .select('UsuarioID','Nome', 'Chapa', 'UsuarioPermissaoID')
    .where('Ativo', true)
    .orderBy('Nome')
    .fetch()

    return users
  }

  async store({ request, auth }){

    const data = request.only([
      'name',
      'plate',
      'email',
      'password',
      'userSectorID',
      'userCreationID',
      'userPermissionID',
      'login',
      'loginType',
      'input',
      'active',
    ])

    const newcurrentDate = Defaults.currentDate()


      const user = await User.create({
        Nome : data.name,
        Chapa: data.plate,
        Senha : data.password,
        Ativo: data.active,
        Login : data.login,
        TipoLogin : data.loginType,
        Email: data.email,
        Input: data.input,
        UsuarioSetorID: data.userSectorID,
        UsuarioPermissaoID : data.userPermissionID,
        UsuarioRegistroID: await auth.check() ? auth.user.UsuarioID : 2115,
        UsuarioAtualizaID : await auth.check() ? auth.user.UsuarioID : 2115,
        DataCadastro : newcurrentDate,
        DataAtualizacao: newcurrentDate,
        LastEditDate: newcurrentDate,
        CreationDate: newcurrentDate,
      })


    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update ({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id)
    const data = request.only([
      'name',
      'plate',
      'email',
      'password',
      'userSectorID',
      'userPermissionID',
      'login',
      'loginType',
      'input',
      'active',
    ])

    const dataTranslated = {
      'Nome' : data.name,
      'Chapa': data.plate,
      'Senha' : data.password,
      'Ativo': data.active,
      'Login' : data.login,
      'TipoLogin' : data.loginType,
      'Email': data.email,
      'Input': data.input,
      'UsuarioSetorID': data.userSectorID,
      'UsuarioPermissaoID' : data.userPermissionID,
      'UsuarioAtualizaID' : await auth.check() ? auth.user.UsuarioID : 2115,
      'DataAtualizacao': newcurrentDate,
      'LastEditDate': newcurrentDate,
    }
    user.merge(dataTranslated)

    await user.save()

    return user

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }

}

module.exports = UserController
