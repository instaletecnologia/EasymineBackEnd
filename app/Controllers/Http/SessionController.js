'use strict'

const Database = use('Database')
const _ = require('lodash')
const crypto = require( 'crypto-js')
const Env = use('Env')
const User = use("App/Models/Usuarios")

class SessionController {

  async currentUser ({ auth }) {

    const user = auth.user.toJSON()
    const permissions = await Database.raw(
      `
      SELECT
        R.ID_AREA as AreaID,
        R.DESCRICAO AS AreaDescricao,
        A.ID_APLICACAO AS ModuloID,
        A.DESCRICAO AS ModuloDescricao,
        F.DIRETORIO AS Diretorio,
        F.ID_FUNCIONALIDADE as FuncionalidadeID,
        F.DESCRICAO AS Funcionalidade,
        F.FORMULARIO AS Formulario
      FROM   sic.TB_ACT_APLICACAO AS A
        INNER JOIN sic.TB_ACT_AREA AS R ON R.ID_AREA = A.ID_AREA
        INNER JOIN sic.TB_ACT_FUNCIONALIDADE AS F ON A.ID_APLICACAO = F.ID_APLICACAO
        INNER JOIN sic.TB_ACT_PERMISSAO AS P ON P.ID_FUNCIONALIDADE = F.ID_FUNCIONALIDADE
        INNER JOIN Usuarios AS U ON U.UsuarioID = P.ID_USUARIO
      WHERE
        (A.ATIVO = 1)
        AND P.ID_USUARIO = ${user.UsuarioID}
        AND ISNULL(DESCONTINUADO,0) = 0
        AND R.ATIVO = 1
        AND F.ATIVO = 1
      `
    )

    let Areas = [], Modulos = [], Diretorios = [], Funcionalidades = []

    permissions.forEach(row => {

      if (!Areas.includes(row.AreaID)) Areas.push(row.AreaID)
      if (!Modulos.includes(row.ModuloID)) Modulos.push(row.ModuloID)

      const directory = _.snakeCase(row.Diretorio).toUpperCase()
      if (!Diretorios.includes(directory)) Diretorios.push(directory)

      if (!Funcionalidades.includes(row.FuncionalidadeID)) Funcionalidades.push(row.FuncionalidadeID)

    })

    return { ...user, Areas, Modulos, Diretorios, Funcionalidades }

  }

  async revokeToken ({ auth }) {
    const apiToken = auth.getAuthHeader()
    auth.revokeTokens([apiToken], true)

    return true
  }

  async store ({ request, response, auth }) {
    const { Login, password } = request.all()
    const passwordCrypto = await crypto.MD5(password).toString().toLocaleUpperCase()
    const loginUperCase = Login.toLocaleUpperCase()

    const userfind = await Database
        .select('UsuarioID')
        .from('dbo.Usuarios')
        .where({'Login': loginUperCase})
        .where({'Senha': passwordCrypto})

    console.log(userfind)
    const user = await User.find(userfind[0].UsuarioID)

    console.log(await auth.generate(user))
    // const token = await auth.attempt(Login, password)
    const token = await auth.generate(user)

    return token
  }

}

module.exports = SessionController
